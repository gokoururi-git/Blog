Function.prototype.myCall = function(context, ...args){
  let content = Object(context) || window;//Object(context)用来处理基本数据类型
  content.fun = this;
  return content.fun(...args);
}
// function fun(name, age){
//   console.log(this);
//   console.log(name, age);
// }
// fun.myCall({name:"hello"});

function fun2(){
  console.log(this);
}

fun2.call(1);