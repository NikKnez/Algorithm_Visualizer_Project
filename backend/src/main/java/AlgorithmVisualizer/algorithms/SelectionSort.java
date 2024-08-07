package AlgorithmVisualizer.algorithms;

import AlgorithmVisualizer.models.Move;
import AlgorithmVisualizer.models.SortResponse;
import AlgorithmVisualizer.models.SortingAlgorithm;

import java.util.ArrayList;
import java.util.List;

public class SelectionSort implements SortingAlgorithm {

    @Override
    public SortResponse sort(List<Integer> array) {
        List<Move> moves = new ArrayList<>();
        int n = array.size();

        for (int i = 0; i < n - 1; i++) {
            int minIndex = i;
            for (int j = i + 1; j < n; j++) {
                if (array.get(j) < array.get(minIndex)) {
                    minIndex = j;
                }
            }
            if (minIndex != i) {
                int temp = array.get(i);
                array.set(i, array.get(minIndex));
                array.set(minIndex, temp);
                moves.add(new Move(i, minIndex));
            }
        }

        SortResponse response = new SortResponse();
        response.setMoves(moves);
        response.setSortedArray(new ArrayList<>(array));
        return response;
    }
}
