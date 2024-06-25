package AlgorithmVisualizer.models;

public class BubbleSortAlgorithm extends Algorithm {
    public BubbleSortAlgorithm() {
        super("1", "Bubble Sort", "A simple sorting algorithm that repeatedly steps through the list...");
    }

    @Override
    public String getCodeSnippet() {
        return "public void bubbleSort(int[] arr) { \n" +
                "    int n = arr.length; \n" +
                "    for (int i = 0; i < n-1; i++) \n" +
                "        for (int j = 0; j < n-i-1; j++) \n" +
                "            if (arr[j] > arr[j+1]) { \n" +
                "                int temp = arr[j]; \n" +
                "                arr[j] = arr[j+1]; \n" +
                "                arr[j+1] = temp; \n" +
                "            } \n" +
                "}";
    }
}
