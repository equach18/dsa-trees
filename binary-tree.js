/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth(node = this.root) {
    // Base case
    if (!node) return 0;
    // Leaf node case
    if (node.left === null && node.right === null) return 1;
    // Case for if there is only one child
    if (node.left === null) return this.minDepth(node.right) + 1;
    if (node.right === null) return this.minDepth(node.left) + 1;
    // Case if there are both children
    return Math.min(this.minDepth(node.left), this.minDepth(node.right)) + 1;
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth(node = this.root) {
    if (!node) return 0;
    if (node.left === null && node.right === null) return 1;
    if (node.left === null) return this.maxDepth(node.right) + 1;
    if (node.right === null) return this.maxDepth(node.left) + 1;
    return Math.max(this.maxDepth(node.left), this.maxDepth(node.right)) + 1;
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let maxResult = 0;
    function maxSumHelper(node) {
      // Base case
      if (!node) return 0;
      // calculate the max left and right sums
      const leftSum = Math.max(maxSumHelper(node.left));
      const rightSum = Math.max(maxSumHelper(node.right));
      // get the max of the current node
      const currentMax = node.val + leftSum + rightSum;

      maxResult = Math.max(maxResult, currentMax);

      // continue down the path of the max gain
      return node.val + Math.max(leftSum, rightSum);
    }
    maxSumHelper(this.root);
    return maxResult;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    let result = null;
    function nextLargerHelper(node) {
      if (!node) return 0;
      // Scenario that the current node val is larger than the lowerBound. Update the result if it is still null or if it is smaller than the current value of result
      if (node.val > lowerBound) {
        if (result === null || node.val < result) {
          result = node.val;
        }
      }

      // Transverse through the left and right nodes
      nextLargerHelper(node.left);
      nextLargerHelper(node.right);
    }
    nextLargerHelper(this.root);
    return result;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    function getLevelAndParent(currNode, findNode, depth = 0, parent = null) {
      if (!currNode) return null;
      if (currNode === findNode) return { depth, parent };

      // Recursively search through the left then right node
      let leftResult = getLevelAndParent(
        currNode.left,
        findNode,
        depth + 1,
        currNode
      );
      if (leftResult) return leftResult;
      return getLevelAndParent(currNode.right, findNode, depth + 1, currNode);
    }

    const node1Info = getLevelAndParent(this.root, node1);
    const node2Info = getLevelAndParent(this.root, node2);

    // return true if parents are not the same, but depths are the same
    return node1Info.parent !== node2Info.parent &&
      node1Info.depth === node2Info.depth
      ? true
      : false;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    let result = [];
    function traverse(node) {
      if (!node) {
        result.push(null);
        return;
      }
      result.push(node.val);
      traverse(node.left);
      traverse(node.right);
    }
    traverse(tree.root);
    return JSON.stringify(result);
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(stringTree) {
    const nodes = JSON.parse(stringTree);
    let index = 0;

    function buildTree() {
      // base case for finished array
      if (index >= nodes.length)return null;
      // handles null nodes
      if (nodes[index] === null) {
        index++; 
        return null;
      }

      const currNode = new BinaryTreeNode(Number(nodes[index]));
      index++;
      currNode.left = buildTree();
      currNode.right = buildTree();

      return currNode;
    }
    return new BinaryTree(buildTree());
  }

}

module.exports = { BinaryTree, BinaryTreeNode };
