Array.prototype.myMap = function(callback, thisArg){//当不提供thisArg的时候使用undefined代替
  let arr = this;
  let res = new Array(arr.length);
  for(let i = 0; i < arr.length; i++){
    res[i] = callback.call(thisArg, arr[i], i, arr);
  }
  return res;
}

let a = [1,2,3,4,5,6];

console.log(a.myMap((curr, index)=>{
  console.log(curr, index);
  return curr.toString();
}))