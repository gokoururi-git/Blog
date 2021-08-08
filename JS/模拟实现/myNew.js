function myNew(constructor, ...args){
  let obj = Object.create(constructor.prototype);// Object.create自己查一下MDN，很简单
  let res = constructor.apply(obj, args);
  if(typeof res === 'object' && res !== null || typeof res === 'function'){
    //别看判断这么多，其实就是如果res是对象就返回res，否则返回obj
    return res;
  }else{
    return obj;
  }
}

