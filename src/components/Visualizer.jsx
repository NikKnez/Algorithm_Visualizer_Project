
import React, { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { config } from '../api/apiClient';
import axios from 'axios';
import { AlgorithmExplanations } from './algorithmExplanations';

Chart.register(...registerables);

const Visualizer = () => {
  const [data, setData] = useState([]);
  const [moves, setMoves] = useState([]);
  const [algorithm, setAlgorithm] = useState('');
  const [speed, setSpeed] = useState(500); // in milliseconds
  const [logMessages, setLogMessages] = useState([]);
  const chartRef = useRef(null);
  const myChart = useRef(null);

  // Refs for managing the sorting process
  const timeoutsRef = useRef([]);
  const isSortingRef = useRef(false);
  const currentStepRef = useRef(0); // Track the current step of sorting
  const savedMovesRef = useRef([]);

  const fetchAlgorithmData = async () => {
    try {
      const response = await axios.post(`${config.url.BASE_URL}algorithms/${algorithm}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { moves, sortedArray } = response.data;
      setMoves(moves);
      savedMovesRef.current = moves; // Save the moves for resuming
      setLogMessages([`Original array = ${JSON.stringify(data)}`]);

      isSortingRef.current = true;
      currentStepRef.current = 0;

      // Start processing the moves
      processNextStep();
      
      // After sorting is complete, update chart with sorted array
      timeoutsRef.current.push(setTimeout(() => {
        if (isSortingRef.current) {
          setLogMessages((prev) => [...prev, `Sorted array = ${JSON.stringify(sortedArray)}`]);
          updateChartWithSortedArray(sortedArray); // Update chart with final sorted array
        }
        isSortingRef.current = false;
      }, moves.length * speed));
    } catch (error) {
      console.error('Error fetching algorithm data:', error);
    }
  };

  const processNextStep = () => {
    if (!isSortingRef.current || currentStepRef.current >= savedMovesRef.current.length) return;

    const move = savedMovesRef.current[currentStepRef.current];
    setTimeout(() => {
      if (!isSortingRef.current) return; // Check if sorting has been paused or stopped
      if (algorithm === 'insertionSort') {
        setLogMessages((prev) => [...prev, `Insert ${data[move.index2]}`]);
      } else if (algorithm === 'bubbleSort') {
        setLogMessages((prev) => [...prev, `Swap ${data[move.index2]} and ${data[move.index1]}`]);
      } else {
        setLogMessages((prev) => [...prev]);
      }
      updateChart(move.index1, move.index2);
      currentStepRef.current += 1;
      processNextStep(); // Process the next step
    }, speed);
  };

  const generateRandomArray = () => {
    const arr = Array.from({ length: 15 }, () => Math.floor(Math.random() * 30));
    setData(arr);
  };

  const handlePause = () => {
    isSortingRef.current = false;
    setLogMessages((prev) => [...prev, 'Sorting process paused']);
    console.log('Sorting paused');
  };

  const handleResume = () => {
    if (isSortingRef.current) return; // If already sorting, do nothing

    isSortingRef.current = true;
    setLogMessages((prev) => [...prev, 'Sorting process resumed']);
    console.log('Sorting resumed');
    processNextStep(); // Resume processing from the current step
  };

  const handleReset = () => {
    setData([]);
    setMoves([]);
    if (myChart.current) {
      myChart.current.destroy();
    }
    console.log('Sorting reset');
  };

  const updateChart = (index1, index2) => {
    if (myChart.current) {
      const chartData = myChart.current.data.datasets[0].data;
      const temp = chartData[index1];
      chartData[index1] = chartData[index2];
      chartData[index2] = temp;
      myChart.current.data.datasets[0].data = chartData; // Update dataset
      myChart.current.update();
    }
  };

  const updateChartWithSortedArray = (sortedArray) => {
    if (myChart.current) {
      myChart.current.data.datasets[0].data = sortedArray; // Update data with sorted array
      myChart.current.data.labels = sortedArray; // Update labels to match sorted array
      myChart.current.update();
    }
  };

  useEffect(() => {
    if (myChart.current) {
      myChart.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    myChart.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data, // Initial labels
        datasets: [
          {
            label: 'Array Elements',
            data: data, // Initial data
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
        ],
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Array Elements',
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Values',
            },
          },
        },
      },
    });
  }, [data]);

  return (
    <div className="visualizer-container">
      <div className="button-group">
        <label htmlFor="algorithm">Choose Algorithm: </label>
        <select id="algorithm" value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
        <option value="empty"></option>
          <option value="bubbleSort">Bubble Sort</option>
          <option value="insertionSort">Insertion Sort</option>
          <option value="selectionSort">Selection Sort</option>
          <option value="combSort">Comb Sort</option>
          <option value="quickSort">Quick Sort</option>
          {/* Add more algorithms here */}
        </select>
      </div>
      <div>
        <label htmlFor="speed">Choose Speed: </label>
        <select id="speed" value={speed} onChange={(e) => setSpeed(Number(e.target.value))}>
          <option value={100}>Fast</option>
          <option value={500}>Medium</option>
          <option value={1000}>Slow</option>
        </select>
      </div>
      <button onClick={generateRandomArray}>Generate Array</button>
      <button onClick={fetchAlgorithmData}>Sort</button>
      <div className="action-buttons">
        <button className="pause-button" onClick={handlePause}>Pause</button>
        <button className="resume-button" onClick={handleResume}>Resume</button>
        <button className="reset-button" onClick={handleReset}>Reset</button>
      </div>
      <div className="algorithm-explanation">
        <h2>Algorithm Explanation</h2>
        <div dangerouslySetInnerHTML={{ __html: AlgorithmExplanations[algorithm] }} />
      </div>
      <canvas ref={chartRef} />
      <div className="console">
        {logMessages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </div>
  );
};

export default Visualizer;