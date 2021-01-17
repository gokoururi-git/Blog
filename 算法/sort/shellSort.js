function shellSort(nums) {
  const len = nums.length;
  let d = len >> 1;
  while (d !== 0) {
    for (let i = 0; i < d; i++) {
      for (let j = i + d; j < len; j += d) {
        let index = j - d;
        while (nums[j] < nums[index]) {
          index -= d;
        }
        let temp = nums[j];
        for (let k = j; k > index; k -= d) {
          nums[k] = nums[k - d];
        }
        nums[index + d] = temp;
      }
    }
    d >>= 1;
  }
  return nums;
}
console.log(shellSort([5,2,3,6,9,1,4,7,8,0,11]));
