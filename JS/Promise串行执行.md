```js
/**
 * 创建promise
 * @param {Number} value 
 */
function makePromise(value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, Math.random() * 1000)
  })
}
/**
 * 打印结果
 * @param {Number} value 
 */
function print(value) {
  return value
}

let promises = [1, 3, 4, 5, 6].map((item, index) => {
  return makePromise(item)
});

// 并行执行
Promise.all(promises)
  .then(() => {
    console.log('done')
  })
  .catch(() => {
    console.log('error')
  })

// 串行执行
let parallelPromises = promises.reduce((total, currentValue) => {
  return total.then(() => currentValue.then(print))
}, Promise.resolve())

parallelPromises
  .then(() => {
    // console.log('done')
  })
  .catch(() => {
    console.log('done')
  })

// 顺带复习一下reduce方法

reduce((total, currentValue, currentIndex, arr) => {}, initialValue)
let arr1 = [1, 2, 3, 4, 5]
let res = arr1.reduce((total, currentValue, currentIndex, arr) => {
  return total + currentValue
});
```