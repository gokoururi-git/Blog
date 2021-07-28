Object.prototype[Symbol.iterator] = function(){
  const target = this;
  const keys = Object.keys(target);
  const len = keys.length;
  let curr = 0;
  return {
    next: ()=>{
      return {
        value: [keys[curr], target[keys[curr]]],
        done: curr++ >= len
      };
    }
  }
}

Object.prototype[Symbol.iterator] = function*(){
  const target = this;
  const keys = Object.keys(target);
  for(let key of keys){
    yield [key, target[key]];
  }
}


const temp = {
  a: 1,
  b: 2,
  c: 3
}

// for(let item of temp){
//   console.log(item);
// }


const iterator = temp[Symbol.iterator]();

console.log(...iterator.next());
console.log(...iterator.next());
console.log(...iterator.next());
console.log(...iterator.next());
console.log(...iterator.next());
console.log(...iterator.next());
console.log(...iterator.next());
console.log(...iterator.next());

const iterator2 = [1,2,3,4,5,6,7][Symbol.iterator]();

console.log(...iterator2.next());
console.log(...iterator2.next());
console.log(...iterator2.next());
console.log(...iterator2.next());
console.log(...iterator2.next());
console.log(...iterator2.next());
console.log(...iterator2.next());
console.log(...iterator2.next());
console.log(...iterator2.next());
console.log(...iterator2.next());
console.log(...iterator2.next());
console.log(...iterator2.next());

