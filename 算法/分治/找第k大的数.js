function findKMax(arr, k){//注：k从1开始
  if(arr.length < k){
    throw new RangeError(k," is over the range!");
  }
  if(arr.length === 0){
    return null;
  }
  let left = [];
  let right = [];
  let len = arr.length;
  let base = arr[0];
  for(let i = 1; i < len; i++){
    if(arr[i] < base){
      right.push(arr[i]);
    }else{
      left.push(arr[i]);
    }
  }
  arr = null;
  if(left.length + 1 === k){
    return base;
  }else if(left.length + 1 < k){
    return findKMax(right, k - left.length - 1);
  }else{
    return findKMax(left, k);
  }
}


for(let i = 0; i < 10; i++){
  console.log(i + 1, findKMax([6,2,5,3,7,4,1,8,9,0],i + 1));
}

