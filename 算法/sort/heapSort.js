function heapSort(arr){
  let stop = arr.length - 1;
  let temp = 0;
  while(stop !== 0){
    for(let i = stop; i > 0; i--){
      temp = arr[i >> 1];
      if(temp.weight < arr[i].weight){
        arr[i >> 1] = arr[i];
        arr[i] = temp;
      }
    }
    temp = arr[stop];
    arr[stop] = arr[0];
    arr[0] = temp;
    stop--;
  }
  return arr;
}

console.log(heapSort([{
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


//结论：堆排序是稳定的