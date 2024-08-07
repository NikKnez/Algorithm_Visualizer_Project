package AlgorithmVisualizer.models;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class TreeNode {
    private int value;
    private TreeNode left;
    private TreeNode right;

    public TreeNode(int value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }


}
