package AlgorithmVisualizer.services;

import AlgorithmVisualizer.algorithms.BubbleSort;
import AlgorithmVisualizer.algorithms.InsertionSort;
import AlgorithmVisualizer.models.*;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AlgorithmService {

    private final Map<String, SortingAlgorithm> algorithms = new HashMap<>();

    public AlgorithmService() {
        algorithms.put("bubbleSort", new BubbleSort());
        algorithms.put("insertionSort", new InsertionSort());
        // algorithms.put("selectionSort", new SelectionSort());
        // Add more algorithms as needed
    }

    public SortResponse sort(String algorithmName, List<Integer> array) {
        SortingAlgorithm algorithm = algorithms.get(algorithmName);
        if (algorithm == null) {
            throw new IllegalArgumentException("Algorithm not found: " + algorithmName);
        }
        return algorithm.sort(array);
    }
}
