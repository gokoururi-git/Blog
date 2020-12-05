function selectSort(nums){
  const copy = nums.slice();
  const len = nums.length;
  let min = 0, minp, temp;
  for(let i = 0; i < len; i++){
    min = copy[i].weight;
    minp = i;
    for(let j = i + 1; j < len; j++){
      if(min > copy[j].weight){
        min = copy[j].weight;
        minp = j;
      }
    }
    temp = copy[i];
    copy[i] = copy[minp];
    copy[minp] = temp;
  }
  return copy;
}

console.log(selectSort([{
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
 * 
 */

 //结论：选择排序是稳定的