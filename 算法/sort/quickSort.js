function quickSort(nums) {
  const len = nums.length;
  if (len <= 1) {//细节点：有可能传来[]
    return nums;
  }
  const copy = nums.slice();
  let l = 0;
  let r = len - 1;
  let temp;
  while (l < r) {
    while (l < r && copy[r].weight >= copy[l].weight) { //此时copy[l]为基值 //细节点1：需要加上l < r的判断 细节点2：比较应该是>=/<=，否则相同的元素会出问题
      r--;
    }
    temp = copy[r];
    copy[r] = copy[l];
    copy[l] = temp;
    while (l < r && copy[l].weight <= copy[r].weight) { //此时copy[r]为基值 //细节点同上
      l++;
    }
    temp = copy[r];
    copy[r] = copy[l];
    copy[l] = temp;
  }//细节点：最终到这里时 l === r === 基址的下标 了
  return [...quickSort(copy.slice(0, l)), copy[l], ...quickSort(copy.slice(l + 1, len))];//细节点：slice第二个参数是结束坐标+1
}


console.log(quickSort([{
  weight: 1,
  name: "1"
},{
  weight: 5,
  name: "2"
},{
  weight: 5,
  name: "3"
},{
  weight: 2,
  name: "4"
},{
  weight: 8,
  name: "5"
},{
  weight: 7,
  name: "6"
},{
  weight: 6,
  name: "7"
},{
  weight: 8,
  name: "8"
},{
  weight: 3,
  name: "9"
},{
  weight: 6,
  name: "10"
}]));

//输出：
/**
 * 
 * [
  { weight: 1, name: '1' },
  { weight: 2, name: '4' },
  { weight: 3, name: '9' },
  { weight: 5, name: '3' },
  { weight: 5, name: '2' },
  { weight: 6, name: '10' },
  { weight: 6, name: '7' },
  { weight: 7, name: '6' },
  { weight: 8, name: '5' },
  { weight: 8, name: '8' }
]
 */

 //结论：快排不是稳定的