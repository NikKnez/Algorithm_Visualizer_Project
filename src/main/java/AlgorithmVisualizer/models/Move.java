package AlgorithmVisualizer.models;

import lombok.*;

@Setter
@Getter
@Data
public class Move {
    private int index1;
    private int index2;


    public Move(int index1, int index2) {
        this.index1 = index1;
        this.index2 = index2;
    }

}
