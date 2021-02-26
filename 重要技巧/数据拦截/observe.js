module.exports = function observe(object, proprety, listener){
  let data = object[proprety];
  if(data === undefined){
    throw new Error("the object has no proprety named '" + proprety + "'");
  }
  Object.defineProperty(object, proprety, {
    set(newValue){
      let res = listener(data, newValue);
      data = res ? res : newValue;
    },
    get(){
      return data;
    }
  })
}