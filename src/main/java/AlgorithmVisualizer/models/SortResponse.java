package AlgorithmVisualizer.models;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class SortResponse {
    private List<Move> moves;
    private List<Integer> sortedArray;

}

