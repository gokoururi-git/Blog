// async function test(params) {
//   const value = await new Promise(res => setTimeout(() => res(params)));
//   console.log(value);
// }
// test();
// 以上代码等效以下代码

function* test(params) {
  console.log(params);
  const value = yield new Promise((res) => setTimeout(() => res(params)));
  console.log(value);
  return value;
}

// 生成器函数相关知识点：
// 有n个yield的话，就会有n + 1个有效的next
// 函数第一行代码开始执行是在调用第一个next时
// 每个next函数调用时都可以传入值，作为yield执行的结果
// 函数入参是生成迭代器时传的，而不是第一个next调用传，第一次调用next时传参是任何没意义的

function execAsyncFunc(genFunc, params) {
  const ctl = genFunc(params);
  return new Promise((resolve) => {
    const helper = (lastResult) => {
      const { done, value } = ctl.next(lastResult);
      if (done) {
        resolve(value);
        return;
      }
      Promise.resolve(value).then((res) => helper(res));
    };
    helper();
  });
}

execAsyncFunc(test, "22222").then((res) => {
  console.log("final", res);
});
