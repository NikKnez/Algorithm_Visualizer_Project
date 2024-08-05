package AlgorithmVisualizer.algorithms;

import AlgorithmVisualizer.models.BinarySearchAlgorithm;
import AlgorithmVisualizer.models.Move;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class BinarySearch implements BinarySearchAlgorithm {
    private int index;

    @Override
    public List<Move> iterativeSearch(List<Integer> array, int target) {
        List<Move> moves = new ArrayList<>();
        int left = 0;
        int right = array.size() - 1;
        index = -1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            // Create a Move object for the current index and value
            Move move = new Move(mid, array.get(mid));

            // Add direction info only if not found
            if (array.get(mid) < target) {
                move.setDirection("Going right");
                left = mid + 1;
            } else if (array.get(mid) > target) {
                move.setDirection("Going left");
                right = mid - 1;
            } else {
                index = mid;
                move.setDirection("Found");
                moves.add(move);
                break;
            }
            moves.add(move); // Add move to the list after setting direction
        }

        if (index == -1) {
            // If not found, log this fact
            Move move = new Move(-1, null);
            move.setDirection("Not found");
            moves.add(move);
        }

        return moves;
    }

    @Override
    public List<Move> recursiveSearch(List<Integer> array, int target) {
        List<Move> moves = new ArrayList<>();
        index = -1;
        recursiveHelper(array, target, 0, array.size() - 1, moves);
        return moves;
    }

    private void recursiveHelper(List<Integer> array, int target, int left, int right, List<Move> moves) {
        if (left > right) {
            return;
        }

        int mid = left + (right - left) / 2;
        Move move = new Move(mid, array.get(mid));

        if (array.get(mid) == target) {
            index = mid;
            move.setDirection("Found");
            moves.add(move);
            return;
        } else if (array.get(mid) < target) {
            move.setDirection("Going right");
            moves.add(move);
            recursiveHelper(array, target, mid + 1, right, moves);
        } else {
            move.setDirection("Going left");
            moves.add(move);
            recursiveHelper(array, target, left, mid - 1, moves);
        }
    }
}
