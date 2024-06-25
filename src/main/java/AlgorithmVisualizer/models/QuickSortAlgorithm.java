package AlgorithmVisualizer.models;

public class QuickSortAlgorithm extends Algorithm {
    public QuickSortAlgorithm() {
        super("2", "Quick Sort", "A fast sorting algorithm that uses divide-and-conquer...");
    }

    @Override
    public String getCodeSnippet() {
        return "public void quickSort(int[] arr, int low, int high) { \n" +
                "    if (low < high) { \n" +
                "        int pi = partition(arr, low, high); \n" +
                "        quickSort(arr, low, pi-1); \n" +
                "        quickSort(arr, pi+1, high); \n" +
                "    } \n" +
                "}";
    }
}

