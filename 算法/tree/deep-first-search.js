/**
 * @param {interface node{
  *   value:any,
  *   children:node[]
  * }} root
  */
 function dfs(root) {
   let stack = [root];
   let res = [];
   let temp;
   while (stack.length !== 0) {
     temp = stack.pop();
     res.push(temp.value);
     temp = temp.children;
     for(let j = temp.length - 1; j >= 0; j--){
       stack.push(temp[j]);
     }
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
 console.log(dfs(root));