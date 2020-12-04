Function.prototype.myCall = function(context, ...args){
  let content = context || window;
  content.fun = this;
  return content.fun(...args);
}
function fun(name, age){
  console.log(this);
  console.log(name, age);
}
fun.myCall({name:"hello"});