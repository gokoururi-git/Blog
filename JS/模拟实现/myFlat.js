Array.prototype.myFlat = function(depth){
  if(depth === undefined){
    depth = Infinity;
  }
  let arr = this;
  let over = false;
  for(let i = 0; i < depth; i++){
    over = true;
    for(let j = 0; j < arr.length; j++){
      if(Array.isArray(arr[j])){
        let temp = arr[j];
        arr.splice(j, 1, ...temp);
        j += temp.length - 1;
        over = false;
      }
    }
    if(over){
      break;
    }
  }
  return arr;
}


console.log([1,[2,[3,[4]]]].myFlat(2));
console.log([1,[2,[3,[4]]]].myFlat());

//不考虑深度版本

Array.prototype.myFlat = function(){
  let arr = this;
  return arr.reduce((acc, curr) => {
    if(Array.isArray(curr)){
      return acc.concat(curr.myFlat());
    }else{
      acc.push(curr);
      return acc;
    }
  }, []);
}

console.log([1,[2,[3,[4]]]].myFlat());