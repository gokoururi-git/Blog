Array.prototype.myReduce = function(func, initValue){
  let arr = this;
  let acc = null;
  if(initValue === undefined){
    acc = func(initValue, arr[i], i, arr)
    for(let i = 1; i < arr.length; i++){
      acc = func(acc, arr[i], i, arr);
    }
  }else{
    acc = initValue;
    for(let i = 0; i < arr.length; i++){
      acc = func(acc, arr[i], i, arr);
    }
  }
  return acc;
}

function fatten(arr){
  return arr.myReduce((acc, curr)=>{
    if(Array.isArray(curr)){
      return acc.concat(fatten(curr));
    }else{
      acc.push(curr);
      return acc;
    }
  },[]);
}


console.log(fatten([1, [2, 3, [4, 5]]]));

