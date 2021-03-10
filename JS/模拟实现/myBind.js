var slice = Array.prototype.slice;
Function.prototype.myBind = function (that) {
  var target = this;
  if (
    typeof target !== 'function' ||
    Object.prototype.toString.call(target) !== '[object Function]'
  ) {
    throw new TypeError('Function.prototype.bind called on incompatible ' + target);
  }

  var args = slice.call(arguments, 1);

  var fNOP = function () {};

  var bound = function () {
    return target.apply(this instanceof fNOP ? this : that, args.concat(slice.call(arguments)));
  };

  fNOP.prototype = target.prototype;
  bound.prototype = new fNOP();

  return bound;
};

Function.prototype.myBind = function (context, ...args){
  let func = this;
  return function binder(...lastargs){
    return func.apply(this instanceof binder ? this : context, ...args, ...lastargs);
  }
}

Function.prototype.myBind = function (context, ...args){
  let func = this;
  let uniqueKey = Symbol();
  let temp = {};
  temp[uniqueKey] = function(...lastargs){
    return func.apply(this instanceof temp[uniqueKey] ? this : context, ...args, ...lastargs);
  }
  return temp[uniqueKey];
}

function test(){
  console.log(this);
}

let temp = test.myBind(String.prototype);

temp();

console.log(new temp());