package AlgorithmVisualizer.services;

import AlgorithmVisualizer.models.Algorithm;
import AlgorithmVisualizer.models.BubbleSortAlgorithm;
import AlgorithmVisualizer.models.QuickSortAlgorithm;
import AlgorithmVisualizer.repositories.AlgorithmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AlgorithmService {

    @Autowired
    private AlgorithmRepository algorithmRepository;

    public List<Algorithm> getAllAlgorithms() {
        return algorithmRepository.findAll();
    }

    public Algorithm getAlgorithmById(String id) {
        return algorithmRepository.findById(id).orElse(null);
    }

    public Algorithm saveAlgorithm(Algorithm algorithm) {
        return algorithmRepository.save(algorithm);
    }

    public void deleteAlgorithm(String id) {
        algorithmRepository.deleteById(id);
    }
}

