function bubbleSort(nums) {
  const copy = nums.slice();
  const len = copy.length;
  let temp = null;
  let sublen = 0;
  for (let i = 0; i < len; i++) {
    sublen = len - i - 1;
    for (let j = 0; j < sublen; j++) {
      if (copy[j].weight > copy[j + 1].weight) {
        temp = copy[j];
        copy[j] = copy[j + 1];
        copy[j + 1] = temp;
      }
    }
  }
  return copy;
}

console.log(bubbleSort([{
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
 * [
  { weight: 1, name: '1' },
  { weight: 2, name: '4' },
  { weight: 3, name: '9' },
  { weight: 5, name: '2' },
  { weight: 5, name: '3' },
  { weight: 6, name: '7' },
  { weight: 6, name: '10' },
  { weight: 7, name: '6' },
  { weight: 8, name: '5' },
  { weight: 8, name: '8' }
]
 */

//结论：冒泡排序是稳定的

