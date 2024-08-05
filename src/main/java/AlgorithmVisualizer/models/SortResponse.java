package AlgorithmVisualizer.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
public class SortResponse {
    private List<Move> moves;
    private List<Integer> sortedArray;


    public SortResponse(List<Move> moves, List<Integer> sortedArray) {
        this.moves = moves;
        this.sortedArray = sortedArray;
    }

}
