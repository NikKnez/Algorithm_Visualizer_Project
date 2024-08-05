package AlgorithmVisualizer.models;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class SearchRequest {
    private List<Integer> array;
    private int target;
}
