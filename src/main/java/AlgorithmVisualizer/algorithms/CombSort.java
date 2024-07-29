package AlgorithmVisualizer.algorithms;

import AlgorithmVisualizer.models.Move;
import AlgorithmVisualizer.models.SortResponse;
import AlgorithmVisualizer.models.SortingAlgorithm;

import java.util.ArrayList;
import java.util.List;

public class CombSort implements SortingAlgorithm {

    @Override
    public SortResponse sort(List<Integer> array) {
        List<Move> moves = new ArrayList<>();
        int n = array.size();
        int gap = n;
        boolean swapped = true;

        // Define shrink factor for gap
        final double shrinkFactor = 1.3;

        while (gap > 1 || swapped) {
            if (gap > 1) {
                gap = (int) (gap / shrinkFactor);
            }

            if (gap < 1) {
                gap = 1;
            }

            int i = 0;
            swapped = false;

            while (i + gap < n) {
                if (array.get(i) > array.get(i + gap)) {
                    // Swap the elements
                    int temp = array.get(i);
                    array.set(i, array.get(i + gap));
                    array.set(i + gap, temp);

                    // Record the swap in moves
                    moves.add(new Move(i, i + gap));
                    swapped = true;
                }
                i++;
            }
        }

        SortResponse response = new SortResponse();
        response.setMoves(moves);
        response.setSortedArray(new ArrayList<>(array));
        return response;
    }
}
