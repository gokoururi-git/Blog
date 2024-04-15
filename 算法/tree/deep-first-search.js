/**
 * @description 对多叉树进行深度遍历，采取的是类似二叉树的先序遍历
 * @param {interface node{
  *   value:any,
  *   children:node[]
  * }} root
  */
function dfs(root) {
  const stack = [root];
  let cur = root;
  while (stack.length) {
    cur = stack.pop();
    console.log(cur.value);
    for (let i = cur.children.length - 1; i >= 0; i--) {
      stack.push(cur.children[i]);
    }
  }
}

function dfs2(root) {
  console.log(root.value);
  for(const curr  of root.children) {
    dfs2(curr);
  }
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
 console.log(dfs2(root));