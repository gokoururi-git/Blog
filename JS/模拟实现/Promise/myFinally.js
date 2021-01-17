Promise.prototype.finally1 = function (callback) {
  this.then(async (res) => {
    await Promise.resolve(callback());
    return res;
  }, async (err) => {
    await Promise.resolve(callback());
    throw err;
  })
}
Promise.prototype.finally2 = function (callback) {
  this.then((res) => {
    return Promise.resolve(callback()).then(() => res);
  }, (err) => {
    return Promise.resolve(callback()).then(() =>{ throw err; });
  })
}

//一步一步来：

//首先想让上一步不管reject还是fulfilled都执行一个函数很简单：

Promise.prototype.finally = function (callback) {
  this.then(() => {
    callback()
  }, () => {
    callback()
  })
}

//接下来需要满足返回一个Promise

Promise.prototype.finally = function (callback) {
  this.then(() => {
    return Promise.resolve(callback());
  }, () => {
    return Promise.resolve(callback());
  })
}

//但是目前有一个问题，我们不应该返回用户的函数的结果而是返回上一次的结果

//你可能会想:
Promise.prototype.finally = function (callback) {
  this.then((res) => {
    callback()
    return Promise.resolve(res);
  }, (err) => {
    callback()
    return Promise.resolve(err);
  })
}

// 接下来怎么变的不清楚了，！！！！！！！！！！！！！！！记得补这里！！！！！！！！！！！！！

//基本原理就是分别在then的两个函数参数中将callback执行结果通过Promise.resolve转化为Promise对象，之后对每个Promise.then，传入