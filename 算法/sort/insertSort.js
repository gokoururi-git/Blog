function insertSort(nums, start = 0, end = nums.length - 1){
  for (let i = start + 1; i <= end; i++) {
    let firstSmallIndex = -1;
    for (let comparedIndex = i - 1; comparedIndex >= start; comparedIndex--) {
      if (nums[comparedIndex] < nums[i]) {
        firstSmallIndex = comparedIndex;
        break;
      }
    }
    console.log([...nums.slice(0, i), '|', ...nums.slice(i)].join(' '), firstSmallIndex);
    // 整体向右移动
    const temp = nums[i];
    for (let j = i; j > firstSmallIndex + 1; j--) {
      nums[j] = nums[j - 1];
    }
    nums[firstSmallIndex + 1] = temp;
  }
  return nums;
}

console.log(insertSort([5,2,3,6,9,1,4,7,8,11,0]));