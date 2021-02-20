Array.prototype.mySome = function(callback, thisArg){//当不提供thisArg的时候使用undefined代替
  let arr = this;
  for(let i = 0; i < arr.length; i++){
    if(callback.call(thisArg, arr[i], i, arr)){
      return true;
    }
  }
  return false;
}

let a = [1,2,3,4,5,6,7];

console.log(a.mySome((curr)=>{
  return curr === 2;
}));

