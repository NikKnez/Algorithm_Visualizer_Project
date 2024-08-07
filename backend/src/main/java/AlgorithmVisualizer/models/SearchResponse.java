package AlgorithmVisualizer.models;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class SearchResponse {
    private List<Move> moves;
    private int index;

    public SearchResponse(List<Move> moves, int index) {
        this.moves = moves;
        this.index = index;
    }
}
