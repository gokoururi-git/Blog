// dp[i]表示选取i个数字的结果

// dp[0] = []
// dp[1] = [[], [1], [2], [3], [4], [5]]
// dp[2] = [
//   [1, 2],
//   [2, 1],
//   [1, 3],
//   [3, 1]
//   ...
// ]

/**
 * 
 * @param {number[]} nums 
 * @param {*} index 
 * @param {*} item 
 * @returns 
 */
function insert(nums, index, item) {
  return [...nums.slice(0, index), item, ...nums.slice(index)]
}

function combinations(nums) {
  const dp = [[], nums.map(i => [i])];
  for (let i = 2; i < nums.length + 1; i++) {
    dp[i] = [];
    for(let j = 0; j < dp[i - 1].length; j++) {
      for (let k = 0; k <= dp[i - 1][j].length; k++) {
        for (let l = 0; l < nums.length; l++) {
          if (dp[i - 1][j].includes(nums[l])) {
            continue;
          }
          dp[i].push(insert(dp[i - 1][j], k, nums[l]));
        }
      }
    }
  }
  return dp.reduce((pre, curr) => pre.concat(curr), []);
}

console.log(combinations([1,2,3]));