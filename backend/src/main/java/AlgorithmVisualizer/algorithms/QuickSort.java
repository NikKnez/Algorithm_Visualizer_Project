package AlgorithmVisualizer.algorithms;

import AlgorithmVisualizer.models.Move;
import AlgorithmVisualizer.models.SortResponse;
import AlgorithmVisualizer.models.SortingAlgorithm;

import java.util.ArrayList;
import java.util.List;

public class QuickSort implements SortingAlgorithm {

    @Override
    public SortResponse sort(List<Integer> array) {
        List<Move> moves = new ArrayList<>();
        List<Integer> arrayCopy = new ArrayList<>(array); // Copy of array for visualization
        quickSort(arrayCopy, 0, arrayCopy.size() - 1, moves);
        SortResponse response = new SortResponse();
        response.setMoves(moves);
        response.setSortedArray(arrayCopy);
        return response;
    }

    private void quickSort(List<Integer> array, int low, int high, List<Move> moves) {
        if (low < high) {
            int pi = partition(array, low, high, moves);
            quickSort(array, low, pi - 1, moves);
            quickSort(array, pi + 1, high, moves);
        }
    }

    private int partition(List<Integer> array, int low, int high, List<Move> moves) {
        int pivot = array.get(high);
        int i = (low - 1);

        for (int j = low; j < high; j++) {
            if (array.get(j) < pivot) {
                i++;
                // Swap array[i] and array[j]
                swap(array, i, j);
                moves.add(new Move(i, j));
            }
        }
        // Swap array[i + 1] and array[high] (pivot)
        swap(array, i + 1, high);
        moves.add(new Move(i + 1, high));
        return i + 1;
    }

    private void swap(List<Integer> array, int i, int j) {
        int temp = array.get(i);
        array.set(i, array.get(j));
        array.set(j, temp);
    }
}

