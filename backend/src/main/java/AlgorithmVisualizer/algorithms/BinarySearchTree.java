package AlgorithmVisualizer.algorithms;

import AlgorithmVisualizer.models.SortResponse;
import AlgorithmVisualizer.models.SortingAlgorithm;
import AlgorithmVisualizer.models.TreeNode;

import java.util.List;

public class BinarySearchTree implements SortingAlgorithm {
    @Override
    public SortResponse sort(List<Integer> array) {
        return null;
    }

    private TreeNode root;


    public void insert(int value) {
        root = insertRec(root, value);
    }

    public TreeNode insertRec(TreeNode root, int value) {
        if (root == null) {
            root = new TreeNode(value);
            return root;
        }
        if (value < root.getValue()) {
            root.setLeft(insertRec(root.getLeft(), value));
        } else if (value > root.getValue()) {
            root.setRight(insertRec(root.getRight(), value));
        }
        return root;
    }

    public boolean search(int value) {
        return searchRec(root, value);
    }

    private boolean searchRec(TreeNode root, int value) {
        if (root == null) {
            return false;
        }
        if (root.getValue() == value) {
            return true;
        }
        if (value < root.getValue()) {
            return searchRec(root.getLeft(), value);
        }
        return searchRec(root.getRight(), value);
    }

    public void inorder() {
        inorderRec(root);
    }

    private void inorderRec(TreeNode root) {
        if (root != null) {
            inorderRec(root.getLeft());
            System.out.print(root.getValue() + " ");
            inorderRec(root.getRight());
        }
    }

    public void preorder() {
        preorderRec(root);
    }

    private void preorderRec(TreeNode root) {
        if (root != null) {
            System.out.print(root.getValue() + " ");
            preorderRec(root.getLeft());
            preorderRec(root.getRight());
        }
    }

    public void postorder() {
        postorderRec(root);
    }

    private void postorderRec(TreeNode root) {
        if (root != null) {
            postorderRec(root.getLeft());
            postorderRec(root.getRight());
            System.out.print(root.getValue() + " ");
        }
    }


}
