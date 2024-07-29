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
    combSort: `
    <h2>Comb Sort</h2>
  
    <p>Comb sort is a relatively simple sorting algorithm originally designed by Włodzimierz Dobosiewicz in 1980. 
    Later it was rediscovered by Stephen Lacey and Richard Box in 1991. 
    Comb sort improves on bubble sort. <br /><br />The basic idea is to eliminate turtles, 
    or small values near the end of the list, since in a bubble sort these slow the sorting down tremendously. 
    Rabbits, large values around the beginning of the list, do not pose a problem in bubble sort.
</p>
    <h3>Complexity</h3>
    <ul>
      <li>Time: Worst - O(n<sup>2</sup>), Best - O(n log n), Average - O(n<sup>2</sup>/2<sup>p</sup>,
      where p is the number of increment)</li>
      <li>Space: Worst - O(1) auxiliary</li>
      </ul>
    `,
    quickSort: `
    <h2>Quick Sort</h2>
  
    <p>Quicksort is a divide and conquer algorithm.
Quicksort first divides a large array into two smaller
sub-arrays: the low elements and the high elements.
Quicksort can then recursively sort the sub-arrays.
The steps are:
<ol>
<li>Pick an element, called a pivot, from the array.</li>
<li>Partitioning: reorder the array so that all elements with
values less than the pivot come before the pivot, while all
elements with values greater than the pivot come after it
(equal values can go either way). After this partitioning,
the pivot is in its final position. This is called the
partition operation.</li>
<li>Recursively apply the above steps to the sub-array of
elements with smaller values and separately to the
sub-array of elements with greater values.</li>
</ol>
Animated visualization of the quicksort algorithm.
The horizontal lines are pivot values.
</p>
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
          <th>Comment</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Quick sort</strong></td>
          <td>n log(n)</td>
          <td>n log(n)</td>
          <td>n<sup>2</sup></td>
          <td>log (n)</td>
          <td>No</td>
          <td>Quicksort is usually done in-place with O(log(n)) stack space</td>
        </tr>
      </tbody>
    </table>
  `,
    // Add more algorithms and their explanations here
  };
  