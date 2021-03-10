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
  console.log(value);
  return value
}

let promises = [1, 3, 4, 5, 6].map((item, index) => {
  return makePromise(item)
});

//方案一
let parallelPromises = promises.reduce((total, currentValue) => {
  return total.then(() => currentValue.then(print))
}, Promise.resolve());

parallelPromises
  .then(() => {
    console.log('done successful');
  })
  .catch(() => {
    console.log('done')
  })

//方案二
let acc = Promise.resolve();

for (let i = 0; i < promises.length; i++) {
  acc = acc.then(() => promises[i].then(print));
}

acc
  .then(() => {
    console.log('done successful');
  })
  .catch(() => {
    console.log('done')
  })
```