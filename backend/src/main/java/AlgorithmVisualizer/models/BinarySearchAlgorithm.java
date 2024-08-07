package AlgorithmVisualizer.models;

import java.util.List;

public interface BinarySearchAlgorithm {
    List<Move> iterativeSearch(List<Integer> array, int target);
    List<Move> recursiveSearch(List<Integer> array, int target);
    int getIndex();
}
