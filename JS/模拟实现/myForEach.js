Array.prototype.myForEach = function(callback, thisArg){//当不提供thisArg的时候使用undefined代替
  let arr = this;
  thisArg = thisArg || global;
  for(let i = 0; i < arr.length; i++){
    callback.call(thisArg, arr[i], i, arr);
  }
}

let a = [1,2,3,4,5,6,7];

a.myForEach(function(curr, index){
  console.log(curr, index, this.a);
}, {a:"a"})

