function rootMid(root){
  let stack = [];
  let curr = root;
  while(stack.length !== 0 || curr){
    while(curr){
      stack.push(curr);
      curr = curr.left;
    }
    curr = stack.pop();
    console.log(curr.val);
    curr = curr.right;
  }
}

const BinTree = require('../common/BinTree/BinTreeUtils');

const root = BinTree.initByArray([1,2,3,4,5,6,7]);

rootMid(root)