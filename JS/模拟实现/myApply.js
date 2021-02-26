Function.prototype.myApply = function(thisArg, args){
  let fun = this;
  let tempkey = Symbol();
  thisArg = Object(thisArg);
  thisArg[tempkey] = fun;
  let result = thisArg[tempkey](...args);
  delete thisArg[tempkey];
  return result;
}

let fun = function(){
  console.log(this);
  console.log(arguments);
}

fun.myApply({a:'here'}, [1,2,3]);

fun.apply(1, [1,2,3]);