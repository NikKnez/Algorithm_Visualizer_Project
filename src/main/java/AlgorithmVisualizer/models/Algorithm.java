package AlgorithmVisualizer.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "algorithms")
@Data
public abstract class Algorithm {
    @Id
    private String id;
    private String name;
    private String description;
    private String codeSnippet;

    public Algorithm(String id, String name, String description, String codeSnippet) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.codeSnippet = codeSnippet;
    }

}

