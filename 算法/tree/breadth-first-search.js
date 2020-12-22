/**
 * @param {interface node{
 *   value:any,
 *   children:node[]
 * }} root
 */
function bfs(root) {
  let stack = [root];
  let res = [];
  let temp;
  while (stack.length !== 0) {
    temp = stack.shift();
    res.push(temp.value);
    stack.push(...temp.children);
  }
  return res;
}
let root = {
  value:0,
  children:[{
    value:1,
    children:[{
      value:2,
      children:[]
    },{
      value:3,
      children:[]
    }]
  },{
    value:4,
    children:[{
      value:5,
      children:[]
    },{
      value:6,
      children:[]
    }]
  },{
    value:7,
    children:[{
      value:8,
      children:[{
        value:9,
        children:[]
      }]
    },{
      value:10,
      children:[]
    }]
  }]
}
console.log(bfs(root));