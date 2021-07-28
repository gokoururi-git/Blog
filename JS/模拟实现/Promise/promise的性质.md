# promise的特性

## Promise内部的异步、同步问题

除了Promise构造函数里的resolve和reject剩下的Promise、then都是以同步执行的（注意then这里说的不是then注册的函数，仅仅是then这个函数），你可能会好奇，说好的then注册函数是异步执行的呢？其实，then注册的函数就是由resolve调用的，而resolve是异步的以至于then注册的函数也是被异步执行的。

## Promise的执行过程

在resolve和reject没有被调用时，先同步执行Promise()传进去的函数，里面resolve，reject的调用异步执行，接着同步执行then，结束之后，在当前主宏任务结束之前，在当前微任务中执行resolve/reject函数，resolve/reject函数有改变所有then创建的promise以及初始实例的1. 状态2. 值 的功能。这些promise之间的值的传递都体现在了每个promise的resolve/reject上了
```js
//then: return new Promise((resolve, reject)=>{
this.onFulfilleds.push((value)=>{
  try{
    let x = onFulfilledCallback(this.value);
    if(x instanceof Promise){
      x.then(resolve, reject);
    }else{
      resolve(x);
    }
  }catch(e){
    reject(e)
  }
})
```

## 在then函数返回的变量上继续用then还是直接在初始

关于Promise的then：
- Promise的then返回了一个新的Promise：既然是返回了新的Promise，那么它的resolve就得有人执行，但却不能由自己执行，所以我们最初的实例起作用了：当第2，3...个由then new的新promise的构造函数执行时，发现初始实例的state是pending的话，就会往初始实例的任务队列里加一个函数，这个函数里有对这个新的promise的resolve/reject的操作。

具体请看代码：

```js
let fulfilledList = [value => value, value => value, value => console.log(value), value => console.log(value), value => value, value => value];
let rejectedList = [reason => reason, reason => reason, reason => console.log(reason), reason => console.log(reason), reason => reason, reason => reason];

let promise1 = Promise.resolve('this is data');

for (let i = 0; i < 6; i++) {
  promise1.then(fulfilledList[i], rejectedList[i]);
}

//this is data
//this is data

let promise2 = Promise.resolve('this is data');

for (let i = 0; i < 6; i++) {
  promise2 = promise2.then(fulfilledList[i], rejectedList[i]);
}

//this is data
//undefined
```

其实这也说明了一个问题：Promise的then注册的函数里，如果需要写异步逻辑而且这个异步逻辑对返回值有影响的时候那么我们需要采用上面代码的第二种的方式。

上面的第二种方法其实是我们最常用的，可以翻译一下：

```js
Promise.resolve().then(...).then(...)...
```

第一种方法的翻译是：

```js
let promise = Promise.resolve();
promise.then(...);
promise.then(...);
...
```

所以我们仿写axios源码的时候需要注意一下我们应该采取第二种方法进行函数的连续注册。
