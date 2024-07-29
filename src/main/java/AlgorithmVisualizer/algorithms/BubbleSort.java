package AlgorithmVisualizer.algorithms;

import AlgorithmVisualizer.models.Move;
import AlgorithmVisualizer.models.SortResponse;
import AlgorithmVisualizer.models.SortingAlgorithm;

import java.util.ArrayList;
import java.util.List;

public class BubbleSort implements SortingAlgorithm {

    @Override
    public SortResponse sort(List<Integer> array) {
        List<Move> moves = new ArrayList<>();
        int n = array.size();
        boolean swapped;
        for (int i = 0; i < n - 1; i++) {
            swapped = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (array.get(j) > array.get(j + 1)) {
                    int temp = array.get(j);
                    array.set(j, array.get(j + 1));
                    array.set(j + 1, temp);
                    moves.add(new Move(j, j + 1));
                    swapped = true;
                }
            }
            if (!swapped) break;
        }
        SortResponse response = new SortResponse();
        response.setMoves(moves);
        response.setSortedArray(new ArrayList<>(array));
        return response;
    }

}
