function rootLast(root){
  let stack = [];
  let curr = root;
  let pre = null;
  while(stack.length !== 0 || curr){
    while(curr){
      stack.push(curr);
      curr = curr.left;
    }
    curr = stack[stack.length - 1];
    if(curr.right === null || curr.right === pre){
      console.log(curr.val);
      pre = curr;
      stack.pop();
      curr = null;
    }else{
      curr = curr.right;
    }
  }
}

const BinTree = require('../common/BinTree/BinTreeUtils');

const root = BinTree.initByArray([1,2,3,4,5,6,7]);

rootLast(root);