// function fun(a, nums2){//贪心，不对
//   const len = a.length;
//   let time1 = 0;let time2 = 0;
//   let res1 = "";
//   let res2 = "";
//   for(let i = 0; i < len; i++){
//     let temp1 = time1 + a[i];
//     let temp2 = time2 + nums2[i];
//     if(temp1 > temp2){
//       time2 = temp2;
//     }else{
//       time1 = temp1;
//     }
//     res1 += " " + time1;
//     res2 += " " + time2;
//   }
//   console.log(res1);
//   console.log(" "+a.join(','));
//   console.log(res2);
//   console.log(" "+nums2.join(','));
//   return Math.max(time1, time2);
// }

function fun(a, b){
  let amax = 0;
  a.forEach(item => {
    amax += item;
  });
  const len = a.length;
  const dp = new Array(len + 1).fill(0).map(v => new Array(amax).fill(0));
  for(let i = 1; i <= len; i++){
    for(let j = 0; j < amax; j++){
      if(j < a[i - 1]){
        dp[i][j] = dp[i - 1][j] + b[i - 1];
      }else{
        dp[i][j] = Math.min(dp[i - 1][j - a[i - 1]], dp[i - 1][j] + b[i - 1]);
      }
    }
  }
  let temp;
  let res = Number.MAX_SAFE_INTEGER;
  for(let i = 0; i < amax; i++){
    temp = Math.max(dp[len][i], i);
    if(res > temp){
      res = temp;
    }
  }
  return res;
}

console.log(fun([2,5,7,10,5,2], [3,8,4,12,3,4]));