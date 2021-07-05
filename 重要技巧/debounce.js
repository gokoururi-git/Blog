function debounce(func, delay){
  let timer = null;
  return function(...args){
    if(timer !== null){
      clearTimeout(tiemr);
    }
    timer = setTimeout(func.bind(this), delay, ...args);
  }
}

let fun = debounce(function(){
  console.log(arguments);
  console.log(this);
}, 500);

fun(1,2,3);

//缺点：
//1. 不能返回值
//2. 无法中断 