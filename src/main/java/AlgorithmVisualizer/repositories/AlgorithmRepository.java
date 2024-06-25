package AlgorithmVisualizer.repositories;

import AlgorithmVisualizer.models.Algorithm;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AlgorithmRepository extends MongoRepository<Algorithm, String> {
}

