package AlgorithmVisualizer.models;

import java.util.List;

public class SortResponse {
    private List<Move> moves;
    private List<Integer> sortedArray;

    // Getters and setters

    public List<Move> getMoves() {
        return moves;
    }

    public void setMoves(List<Move> moves) {
        this.moves = moves;
    }

    public List<Integer> getSortedArray() {
        return sortedArray;
    }

    public void setSortedArray(List<Integer> sortedArray) {
        this.sortedArray = sortedArray;
    }
}

