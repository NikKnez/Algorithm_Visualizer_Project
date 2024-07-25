import React, { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { config } from '../api/apiClient';
import axios from 'axios';

Chart.register(...registerables);

const Visualizer = () => {
  const [data, setData] = useState([]);
  const [moves, setMoves] = useState([]);
  const [algorithm, setAlgorithm] = useState('bubbleSort');
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
      
      timeoutsRef.current.push(setTimeout(() => {
        if (isSortingRef.current) {
          setLogMessages((prev) => [...prev, `Sorted array = ${JSON.stringify(sortedArray)}`]);
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
      setLogMessages((prev) => [...prev, `Swap ${move.index1} and ${move.index2}`]);
      updateChart(move.index1, move.index2);
      currentStepRef.current += 1;
      processNextStep(); // Process the next step
    }, speed);
  };

  const generateRandomArray = () => {
    const arr = Array.from({ length: 15 }, () => Math.floor(Math.random() * 100));
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
    console.log('Sorting reseted');
  };

  const updateChart = (index1, index2) => {
    if (myChart.current) {
      const data = myChart.current.data.datasets[0].data;
      const temp = data[index1];
      data[index1] = data[index2];
      data[index2] = temp;
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
        labels: data.map((_, index) => index),
        datasets: [
          {
            label: 'Array Elements',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'category',
            labels: data.map((_, index) => index),
          },
          y: {
            beginAtZero: true,
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
      <option value="bubbleSort">Bubble Sort</option>
      <option value="insertionSort">Insertion Sort</option>
      <option value="selectionSort">Selection Sort</option>
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
