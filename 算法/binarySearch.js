export class BinarySearchArray extends Array{
  constructor(...args){
    super(...args);
  }
  /**
   * 对数组进行二进制查找
   * @param {number} target 要找的数
   * @returns 当数组中有这个数就返回对应的下标，如果没有，就返回数组中最接近这个数的两个下标组成的数组
   */
  binarySearch(target){
    const arr = this;
    let l = 0;
    let r = arr.length - 1;
    while(l <= r){//结束条件: l === r + 1
      let mid = l + ((r - l) >> 1);
      if(arr[mid] === target){
        return mid;
      }else if(arr[mid] < target){
        l = mid + 1;
      }else{
        r = mid - 1;
      }
    }
    return [r, l];
  }
  leftBoundary(target){
    const arr = this;
    let l = 0;
    let r = arr.length - 1;
    while(l <= r){//结束条件: l === r + 1 (和r === l - 1是一个东西)
      let mid = l + ((r - l) >> 1);
      if(arr[mid] === target){
        r = mid - 1; //先让r变为mid - 1,这样即使这个r是结果，最终结束时l也会因为结束条件是l === r + 1让l是正确答案
      }else if(arr[mid] < target){
        l = mid + 1;
      }else{
        r = mid - 1;
      }
    }
    return l;
  }
  rightBoundary(target){
    const arr = this;
    let l = 0;
    let r = arr.length - 1;
    while(l <= r){//结束条件: r === l - 1(和l === r + 1是一个东西)
      let mid = l + ((r - l) >> 1);
      if(arr[mid] === target){
        l = mid + 1; //先让l变为mid + 1,这样即使这个l是结果，最终结束时r也会因为结束条件是r === l - 1让r是正确答案
      }else if(arr[mid] < target){
        l = mid + 1;
      }else{
        r = mid - 1;
      }
    }
    return r;
  }
}

const arr = new BinarySearchArray(4,4,4,4);

console.log(arr.leftBoundary(4));