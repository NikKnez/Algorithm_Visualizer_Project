export const AlgorithmExplanations = {
  bubbleSort: `
    <h2>Bubble Sort</h2>
    <p>Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that repeatedly steps through the list to be sorted, compares each pair of adjacent items and swaps them if they are in the wrong order (ascending or descending arrangement). The pass through the list is repeated until no swaps are needed, which indicates that the list is sorted.</p>
    <h3>Complexity</h3>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Best</th>
          <th>Average</th>
          <th>Worst</th>
          <th>Memory</th>
          <th>Stable</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Bubble sort</strong></td>
          <td>n</td>
          <td>n<sup>2</sup></td>
          <td>n<sup>2</sup></td>
          <td>1</td>
          <td>Yes</td>
        </tr>
      </tbody>
    </table>
  `,
    insertionSort: `
    <h2>Insertion Sort</h2>
  
    <p>Insertion sort is a simple sorting algorithm that builds
    the final sorted array one item at a time. It is much
    less efficient on large lists than more advanced algorithms
    such as quicksort, heapsort, or merge sort. The algorithm
    works by removing each item from the input data and
    inserting it into the correct position in a new sorted list.</p>
    <h3>Insertion sort</h3>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Best</th>
          <th>Average</th>
          <th>Worst</th>
          <th>Memory</th>
          <th>Stable</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Insertion sort</strong></td>
          <td>n</td>
          <td>n<sup>2</sup></td>
          <td>n<sup>2</sup></td>
          <td>1</td>
          <td>Yes</td>
        </tr>
      </tbody>
    </table>
  `,
    selectionSort: `
    <h2>Selection Sort</h2>
  
    <p>Selection sort is a sorting algorithm, specifically an
in-place comparison sort. It has O(n2) time complexity,
making it inefficient on large lists, and generally
performs worse than the similar insertion sort.
Selection sort is noted for its simplicity, and it has
performance advantages over more complicated algorithms
in certain situations, particularly where auxiliary
memory is limited.</p>
    <h3>Selection Sort</h3>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Best</th>
          <th>Average</th>
          <th>Worst</th>
          <th>Memory</th>
          <th>Stable</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Selection Sort</strong></td>
          <td>n<sup>2</sup></td>
          <td>n<sup>2</sup></td>
          <td>n<sup>2</sup></td>
          <td>1</td>
          <td>No</td>
        </tr>
      </tbody>
    </table>
    `,
    // Add more algorithms and their explanations here
  };
  