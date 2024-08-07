import React, { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { config } from '../api/apiClient';
import axios from 'axios';
import { AlgorithmExplanations } from './algorithmExplanations';

Chart.register(...registerables);

const Visualizer = () => {
  const [data, setData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [moves, setMoves] = useState([]);
  const [algorithm, setAlgorithm] = useState('');
  const [speed, setSpeed] = useState(500); // in milliseconds
  const [logMessages, setLogMessages] = useState([]);
  const chartRef = useRef(null);
  const myChart = useRef(null);

  // Refs for managing the process
  const timeoutsRef = useRef([]);
  const isSortingRef = useRef(false);
  const currentStepRef = useRef(0); // Track the current step
  const savedMovesRef = useRef([]);

  const fetchAlgorithmData = async () => {
    try {
      let response;
      let target = null;
  
      if (algorithm.includes('BinarySearch')) {
        // Prompt user for target value
        const targetInput = prompt("Enter target value for binary search:");
        if (targetInput === null) {
          // User canceled the prompt
          setLogMessages((prev) => [...prev, 'Binary search canceled.']);
          return;
        }
        target = Number(targetInput);
  
        if (isNaN(target)) {
          // Invalid input
          setLogMessages((prev) => [...prev, 'Invalid target value. Please enter a number.']);
          return;
        }
  
        response = await axios.post(
          `${config.url.BASE_URL}algorithms/${algorithm}/search`,
          { array: data, target: target },
          { headers: { 'Content-Type': 'application/json' } }
        );
      } else {
        response = await axios.post(
          `${config.url.BASE_URL}algorithms/${algorithm}/sort`,
          data,
          { headers: { 'Content-Type': 'application/json' } }
        );
      }
  
      const { moves, sortedArray, index } = response.data;
      setMoves(moves);
      savedMovesRef.current = moves;
      if (algorithm.includes('iterative')) {
        setLogMessages([`Using iterative binary search to find ${target}`]);
      } else if (algorithm.includes('recursive')) {
        setLogMessages([`Using recursive binary search to find ${target}`]);
      } else {
        setLogMessages([`Original array = ${JSON.stringify(data)}`]);
      }
      
  
      isSortingRef.current = true;
      currentStepRef.current = 0;
  
      // Start processing the moves
      processNextStep();
  
      // After process is complete, update chart
      timeoutsRef.current.push(
        setTimeout(() => {
          if (isSortingRef.current) {
            if (algorithm.includes('BinarySearch')) {
              if (index === -1) {
                setLogMessages((prev) => [...prev, `${target} is not found!`]);
              } else {
                setLogMessages((prev) => [...prev, `Searching at index: ${index}`]);
                setLogMessages((prev) => [...prev, `${target} is found at position ${index}!`]);
              }
            } else if (sortedArray) {
              setLogMessages((prev) => [...prev, `Sorted array = ${JSON.stringify(sortedArray)}`]);
              updateChartWithSortedArray(sortedArray); // Update chart with final result
            }
          }
          isSortingRef.current = false;
        }, moves.length * speed)
      );
    } catch (error) {
      console.error('Error fetching algorithm data:', error);
      setLogMessages((prev) => [...prev, 'Error fetching algorithm data. Please check console for details.']);
    }
  };  

  const processNextStep = () => {
    if (!isSortingRef.current || currentStepRef.current >= savedMovesRef.current.length) return;
  
    const move = savedMovesRef.current[currentStepRef.current];
    setTimeout(() => {
      if (!isSortingRef.current) return; // Check if sorting has been paused or stopped
  
      if (algorithm.includes('BinarySearch')) {
        setLogMessages((prev) => [...prev, `Searching at index: ${move.index1}`]);
        if (move.direction) {
          setLogMessages((prev) => [...prev, move.direction]);
      }
      } else if (algorithm === 'insertionSort') {
        setLogMessages((prev) => [...prev, `Insert ${data[move.index2]}`]);
      } else if (algorithm === 'bubbleSort') {
        setLogMessages((prev) => [...prev, `Swap ${data[move.index2]} and ${data[move.index1]}`]);
      }
  
      highlightElements(move.index1, move.index2);
      if (!algorithm.includes('BinarySearch')) { // Update chart only if not binary search
        updateChart(move.index1, move.index2);
      }
      currentStepRef.current += 1;
      processNextStep(); // Process the next step
    }, speed);
  };
  
  const generateRandomArray = () => {
    if (algorithm.includes('BinarySearch')) {
      const arr = Array.from({ length: 15 }, () => Math.floor(Math.random() * 50));
      //const arr = [4, 4, 9, 11, 11, 15, 17, 18, 25, 30, 32, 34, 38, 44, 45];
      arr.sort((a, b) => a - b);
      setData(arr);
    } else {
      const arr = Array.from({ length: 15 }, () => Math.floor(Math.random() * 20));
      setData(arr);
    }
    
  };

  const handlePause = () => {
    isSortingRef.current = false;
    setLogMessages((prev) => [...prev, 'Process paused']);
    console.log('Process paused');
  };

  const handleResume = () => {
    if (isSortingRef.current) return; // If already processing, do nothing

    isSortingRef.current = true;
    setLogMessages((prev) => [...prev, 'Process resumed']);
    console.log('Process resumed');
    processNextStep(); // Resume processing from the current step
  };

  const handleReset = () => {
    setData([]);
    setMoves([]);
    if (myChart.current) {
      myChart.current.destroy();
    }
    console.log('Process reset');
  };

  const highlightElements = (index1, index2) => {
    const arrayCells = document.querySelectorAll('.array-cell');
    arrayCells.forEach((cell, idx) => {
      if (idx === index1 || idx === index2) {
        cell.classList.add('highlight');
      } else {
        cell.classList.remove('highlight');
      }
    });
  };

  const updateChart = (index1, index2) => {
    if (myChart.current && !algorithm.includes('BinarySearch')) {
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

    if (chartRef.current) {
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
    }
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
          <option value="iterativeBinarySearch">Iterative Binary Search</option>
          <option value="recursiveBinarySearch">Recursive Binary Search</option>
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
      <button onClick={fetchAlgorithmData}>{algorithm.includes('BinarySearch') ? 'Search' : 'Sort'}</button>
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
      <div className="array1d-tracer">
        {data.map((value, index) => (
          <div key={index} className="array-cell-wrapper">
            <div className="index">{index}</div>
            <div className="array-cell">
              <div className="value">{value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Visualizer;
