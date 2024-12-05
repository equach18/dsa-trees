/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    if (!this.root) return 0;
    function sumValuesHelper(node) {
      // base case
      if (!node) return 0;
      // holds the sum of all nodes when recurred
      let sum = node.val;
      // recur for all children
      for (let child of node.children) {
        sum += sumValuesHelper(child);
      }
      return sum;
    }
    return sumValuesHelper(this.root);
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    if (!this.root) return 0;
    function countEvensHelper(node) {
      // base case
      if (!node) return 0;
      let counter = 0;
      // checks if the current node is even. increment counter if so
      if (node.val % 2 === 0) counter++;
      // recur for all children 
      for (let child of node.children) {
        counter += countEvensHelper(child);
      }
      return counter;
    }
    return countEvensHelper(this.root);
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    if (!this.root) return 0;
    function numGreaterHelper(node) {
      // base case
      if (!node) return 0;

      let counter = 0;
      // checks if the current node is greater than the lower bound. Increment counter if so
      if (node.val > lowerBound) counter++;
      // recur for all chilren
      for (let child of node.children) {
        counter += numGreaterHelper(child);
      }
      return counter;
    }
    return numGreaterHelper(this.root);
  }
}

module.exports = { Tree, TreeNode };
