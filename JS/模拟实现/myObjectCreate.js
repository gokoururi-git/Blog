function create(prototype){
  function temp(){}
  temp.prototype = prototype;
  return new temp();
}

/**
 * 相当于
 * function(prototype){
 *    let obj = {};
 *    obj.__ptoto__ = prototype;
 *    return obj;
 * }
 */

//相关：JS/原型链要点.md