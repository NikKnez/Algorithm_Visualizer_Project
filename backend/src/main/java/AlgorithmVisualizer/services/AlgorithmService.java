package AlgorithmVisualizer.services;

import AlgorithmVisualizer.algorithms.*;
import AlgorithmVisualizer.models.*;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AlgorithmService {

    private final Map<String, SortingAlgorithm> algorithms = new HashMap<>();
    private final Map<String, BinarySearchAlgorithm> searchAlgorithms = new HashMap<>();

    public AlgorithmService() {
        algorithms.put("bubbleSort", new BubbleSort());
        algorithms.put("insertionSort", new InsertionSort());
        algorithms.put("selectionSort", new SelectionSort());
        algorithms.put("combSort", new CombSort());
        algorithms.put("quickSort", new QuickSort());
        // Add more algorithms

        BinarySearch binarySearch = new BinarySearch();
        searchAlgorithms.put("iterativeBinarySearch", binarySearch);
        searchAlgorithms.put("recursiveBinarySearch", binarySearch);
    }

    public SortResponse sort(String algorithmName, List<Integer> array) {
        SortingAlgorithm algorithm = algorithms.get(algorithmName);
        if (algorithm == null) {
            throw new IllegalArgumentException("Algorithm not found: " + algorithmName);
        }
        return algorithm.sort(array);
    }

    public SearchResponse search(String algorithmName, List<Integer> array, int target) {
        BinarySearchAlgorithm algorithm = searchAlgorithms.get(algorithmName);
        if (algorithm == null) {
            throw new IllegalArgumentException("Algorithm not found: " + algorithmName);
        }
        List<Move> moves = algorithmName.equals("iterativeBinarySearch") ?
                algorithm.iterativeSearch(array, target) :
                algorithm.recursiveSearch(array, target);
        return new SearchResponse(moves, algorithm.getIndex());
    }
}
