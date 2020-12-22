/**
 * @description: 
 * @param {*} root
 * @return {*}
 */
function rootFirst(root){
  let stack = [root];
  while(stack.length !== 0){
    let temp = stack.pop();
    console.log(temp.val);
    if(temp.right){
      stack.push(temp.right);
    }
    if(temp.left){
      stack.push(temp.left);
    }
  }
}

const BinTree = require('../common/BinTree/BinTreeUtils');

const root = BinTree.initByArray([1,2,3,4,5,6,7]);

console.log(rootFirst(root));