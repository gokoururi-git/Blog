const funcs = [
  function (num, next) {
    num += 1;
    num = next(num);
    num += 1;
    return num;
  },
  function (num, next) {
    num += 2;
    num = next(num);
    num += 2;
    return num;
  }
];

function use(funcs){
  return function(num){
    let i = 0;
    function next(curr){
      let nextFun = funcs[i++];
      if(nextFun === undefined){
        return curr;
      }
      return nextFun(curr, next);
    }
    return next(num);
  }
}

const wrapper = use(funcs);

console.log(wrapper(2));
console.log(wrapper(5));