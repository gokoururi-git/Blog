function flatten(arr){
  return arr.reduce((accumulator, curr)=>{
    if(Array.isArray(curr)){
      return flatten(accumulator.concat(curr));
    }else{
      return accumulator.concat(curr);
    }
  },[]);
}

console.log(flatten([1, [2, 3, [4, 5]]]));
