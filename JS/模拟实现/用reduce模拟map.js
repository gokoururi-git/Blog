Array.prototype.myReduceMap = function(fun, thisArg){//首先，下面用到this我们不能用箭头函数定义
  thisArg = thisArg || global || window;
  return this.reduce((acc, curr, index, array)=>{
    acc.push(fun.call(thisArg, curr, index, array));
    return acc;
  }, []);
}

console.log([1,2,3,4,5,6].myReduceMap((curr, index, array)=>{
  return curr + 1;
}));



