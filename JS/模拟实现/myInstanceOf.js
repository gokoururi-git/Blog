Object.prototype.myInstanceOf = function(constructor){
  let curr = Object.getPrototypeOf(this);
  let target = constructor.prototype;
  while(curr){
    if(curr === target){
      return true;
    }
    curr = Object.getPrototypeOf(curr);
  }
  return false;
}

//说几个容易错的地方：
/**
 * 1. 我们应该往上找的是this的原型，不要搞混了
 * 2. prototype是“变量”，我们获取它的原型应该用Object.getPrototypeOf()
 * 千万记得：函数才有prototype
 */

