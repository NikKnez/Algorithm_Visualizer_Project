package AlgorithmVisualizer.models;

import lombok.Getter;
import lombok.Setter;
import lombok.Data;

@Setter
@Getter
@Data
public class Move {
    private int index1;
    private int index2;
    private Integer value;
    private String direction;

    public Move(int index1, Integer value) {
        this.index1 = index1;
        this.value = value;
    }

    public Move(int index1, Integer value, String direction) {
        this(index1, value);
        this.direction = direction;
    }
}
