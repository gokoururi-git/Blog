function fatten(arr){
  return arr.reduce((accumulator, curr)=>{
    if(Array.isArray(curr)){
      return fatten(accumulator.concat(curr));
    }else{
      return accumulator.concat(curr);
    }
  },[]);
}

console.log(fatten([1, [2, 3, [4, 5]]]));
