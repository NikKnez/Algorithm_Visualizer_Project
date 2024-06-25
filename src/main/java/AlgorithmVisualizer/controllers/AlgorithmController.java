package AlgorithmVisualizer.controllers;

import AlgorithmVisualizer.models.Algorithm;
import AlgorithmVisualizer.services.AlgorithmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/algorithms")
public class AlgorithmController {

    @Autowired
    private AlgorithmService algorithmService;

    @GetMapping
    public ResponseEntity<List<Algorithm>> getAllAlgorithms() {
        try {
            return ResponseEntity.ok(algorithmService.getAllAlgorithms());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Algorithm> getAlgorithmById(@PathVariable String id) {
        Algorithm algorithm = algorithmService.getAlgorithmById(id);
        return algorithm != null ? ResponseEntity.ok(algorithm) : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping
    public ResponseEntity<Algorithm> saveAlgorithm(@RequestBody Algorithm algorithm) {
        try {
            Algorithm savedAlgorithm = algorithmService.saveAlgorithm(algorithm);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedAlgorithm);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAlgorithm(@PathVariable String id) {
        try {
            algorithmService.deleteAlgorithm(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}


