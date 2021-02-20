Array.prototype.myFilter = function(callback, thisArg){//当不提供thisArg的时候使用undefined代替
  let arr = this;
  let res = [];
  for(let i = 0; i < arr.length; i++){
    if(callback.call(thisArg, arr[i], i, arr)){
      res.push(arr[i]);
    }
  }
  return res;
}

let arr = [1,2,3,4,5,6];

console.log(arr.myFilter((curr)=>{
  return curr >= 4;
}));

