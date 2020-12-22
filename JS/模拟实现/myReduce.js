Array.prototype.myReduce = function(func, initValue){
  let acc = initValue === undefined ? null : initValue;
  this.forEach((curr, index, array)=>{
    acc = func(acc, curr, index, array);
  });
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

