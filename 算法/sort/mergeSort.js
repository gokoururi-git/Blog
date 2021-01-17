function merge(nums, start1, end1, start2, end2){
  let res = new Array(end2 - start1 + 1);
  let start = start1;
  let index = 0;
  while(start1 <= end1 && start2 <= end2){
    if(nums[start1] <= nums[start2]){
      res[index++] = nums[start1++];
    }else{
      res[index++] = nums[start2++];
    }
  }
  while(start1 <= end1){
    res[index++] = nums[start1++];
  }
  while(start2 <= end2){
    res[index++] = nums[start2++];
  }
  for(let i = 0; i < index; i++){
    nums[i + start] = res[i];
  }
}

function mergeSortHelp(nums, start, end){
  if(start >= nums.length || start === end){
    return;
  }
  let mid = (start + end) >> 1;
  mergeSortHelp(nums, start, mid);
  mergeSortHelp(nums, mid + 1, end);
  merge(nums, start, mid, mid + 1, end);
}

function mergeSort(nums){
  mergeSortHelp(nums, 0, nums.length - 1);
  return nums;
}

console.log(mergeSort([5,2,3,6,9,1,4,7,8,0,11]));