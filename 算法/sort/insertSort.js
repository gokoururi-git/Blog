function insertSort(nums){
  const len = nums.length;
  for(let i = 1; i < len; i++){
    let index = i - 1;
    while(nums[i] < nums[index]){//这里简写依赖了nums[-1]的值是undefined，并且任何number 和 undefined 做大小比较结果都是false
      index--;
    }
    let temp = nums[i];
    for(let j = i; j > index; j--){
      nums[j] = nums[j - 1];
    }
    nums[index + 1] = temp;
  }
  return nums;
}

console.log(insertSort([5,2,3,6,9,1,4,7,8,0,11]));