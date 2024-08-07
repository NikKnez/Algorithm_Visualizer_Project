package AlgorithmVisualizer.controllers;

import AlgorithmVisualizer.models.SearchRequest;
import AlgorithmVisualizer.models.SearchResponse;
import AlgorithmVisualizer.models.SortResponse;
import AlgorithmVisualizer.services.AlgorithmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/algorithms")
public class AlgorithmController {

    private final AlgorithmService algorithmService;

    @Autowired
    public AlgorithmController(AlgorithmService algorithmService) {
        this.algorithmService = algorithmService;
    }

    @PostMapping("/{algorithmName}/sort")
    public ResponseEntity<SortResponse> sort(@PathVariable String algorithmName, @RequestBody List<Integer> array) {
        SortResponse response = algorithmService.sort(algorithmName, array);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{algorithmName}/search")
    public ResponseEntity<SearchResponse> search(@PathVariable String algorithmName, @RequestBody SearchRequest request) {
        SearchResponse response = algorithmService.search(algorithmName, request.getArray(), request.getTarget());
        return ResponseEntity.ok(response);
    }
}
