"use strict";
const PENDING = Symbol('PENDING');
const FULFILLED = Symbol('FULFILLED');
const REJECTED = Symbol('REJECTED');
class MyPromise {
  constructor(executor) {
    this.value = null;
    this.reason = null;
    //下面这两个队列并不是简单地将then注册的函数放进去
    //而是保存了包装了一层的函数
    //由于then会返回一个新的promise
    //所以我们需要适当的时候将这个新的promise的resolve或者reject调用
    //具体见onFulfilledWraper、和onRejectedWraper函数
    this.onFilfilleds = [];
    this.onRejecteds = [];
    this.state = PENDING;
    const resolve = (data) => {
      setTimeout(() => {
        if (this.state === REJECTED) return;
        this.value = data;
        //注意这里不是this.value = this.onFilfilleds.shift()(this.value);
        //对于this.value的赋值操作完全由这个函数执行
        //（最重要的是理解promise本身没有链式性质，是每个then新建了一个promise并与promise任务队列产生关联之后
        //才有了链式操作）
        while (this.onFilfilleds.length !== 0) {
          this.onFilfilleds.shift()(data);
        }
        this.state = FULFILLED;
      })
    }
    const reject = (reason) => {
      setTimeout(() => {
        if (this.state === FULFILLED) return;
        this.value = reason;
        while (this.onRejecteds.length !== 0) {
          this.onRejecteds.shift()(reason);
        }
        this.state = REJECTED;
      })
    }
    try{
      executor(resolve, reject);
    }catch(e){
      reject(e);
    }
  }
  then(onFulfilled, onRejected) {
    //当onFulfilled或者onRejected不是函数，那么就让他们传递value
    if (typeof onFulfilled !== 'function') {
      onFulfilled = value => value;
    }
    if (typeof onRejected !== 'function') {
      onRejected = reason => {
        throw new Error(reason instanceof Error ? reason.message : reason);
      }
    }

    return new Promise((resolve, reject) => {
      let onFulfilledWraper = (result) => {
        try {
          let x = onFulfilled(result);
          if (x instanceof MyPromise) {
            x.then(resolve, reject);
          } else {
            resolve(x);
          }
        } catch (e) {
          reject(e);
        }
      }
      let onRejectedWraper = (reason) => {
        try {
          let x = onRejected(reason);
          if (x instanceof MyPromise) {
            x.then(resolve, reject);
          } else {
            reject(x);
          }
        } catch (e) {
          reject(e);
        }
      }
      if (this.state === PENDING) {
        this.onFilfilleds.push(onFulfilledWraper);
        this.onRejecteds.push(onRejectedWraper);
      } else if (this.state === FULFILLED) {
        onFulfilledWraper(this.value);
      } else {
        onRejectedWraper(this.reason);
      }
    });
  }
  //由于无法知道promise的最终状态，所以finally的回调函数中不接收任何参数
  //它仅用于无论最终结果如何都要执行的情况。
  //与Promise.resolve/reject(2).then(() => {}, () => {}) （resolved/reject的结果为undefined）不同
  //Promise.resolve/reject(2).finally(() => {}) resolved/reject的结果为 2。
  //另外注意一点的是，finally注册的函数返回结果不影响finally后面的then的值（还是finally前一个promise的值）
  finally(executor) {
    return this.then(value => {
      Promise.resolve(executor()).then(() => value);
    }, reason => {
      Promise.resolve(executor()).then(() => {
        throw reason;
      });
    })
  } catch (onRejected) {
    return this.then(undefined, onRejected);
  }
  static resolve(value) {
    if (value instanceof MyPromise) {
      return value;
    }
    return new MyPromise(resolve => resolve(value));
  }
  static reject(reason) {
    if (reason instanceof MyPromise) {
      return reason;
    }
    return new MyPromise(reason => reject(reason));
  }
  static all(...promises) {
    return new MyPromise((resolve, reject) => {
      let result = new Array(promises.length);
      let successed = 0;
      promises.forEach((curr, index) => {
        MyPromise.resolve(curr).then((res) => {
          result[index] = res;
          successed++;
          if (successed === promises.length) {
            resolve(curr);
          }
        }, (reason) => {
          reject(reason);
        })
      })
    });
  }
  static race(...promises) {
    return new Promise((resolve, reject) => {
      promises.forEach((curr) => {
        Promise.resolve(curr).then(result => {
          resolve(result);
        }, reason => {
          reject(reason)
        })
      })
    })
  }
}