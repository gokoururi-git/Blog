function myNew(constructor, ...args){
  let obj = Object.create(constructor.prototype);
  let res = constructor.apply(obj, args);
  if(res !== null || typeof res === 'function' || typeof res === 'object'){//总之如果是对象就返回对象，否则返回obj
    return res;
  }else{
    return obj;
  }
}


