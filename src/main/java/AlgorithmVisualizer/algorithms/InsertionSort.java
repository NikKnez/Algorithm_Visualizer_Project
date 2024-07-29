package AlgorithmVisualizer.algorithms;

import AlgorithmVisualizer.models.Move;
import AlgorithmVisualizer.models.SortResponse;
import AlgorithmVisualizer.models.SortingAlgorithm;

import java.util.ArrayList;
import java.util.List;

public class InsertionSort implements SortingAlgorithm {
    @Override
    public SortResponse sort(List<Integer> array) {
        List<Move> moves = new ArrayList<>();
        int n = array.size();
        for (int i = 1; i < n; i++) {
            int key = array.get(i);
            int j = i - 1;
            while (j >= 0 && array.get(j) > key) {
                array.set(j + 1, array.get(j));
                moves.add(new Move(j + 1, array.get(j)));  // Record the move with value
                j--;
            }
            array.set(j + 1, key);
            if (j + 1 != i) {
                moves.add(new Move(j + 1, key));  // Record the final insertion with value
            }
        }
        SortResponse response = new SortResponse();
        response.setMoves(moves);
        response.setSortedArray(new ArrayList<>(array));
        return response;
    }
}
