/**
 * @param {any} v: any variable
 * @return {string} : the type of v 
 */
function myTypeof1(v){
  const type = typeof v;
  if(type !== "object"){
    return type;
  }else{
    if(v === null){
      return "null";
    }
    if(v instanceof Date){
      return "date";
    }
    if(v instanceof RegExp){
      return "regExp";
    }
    if(Array.isArray(v)){
      return "array";
    }
    return "object";
  }
}
/**
 * @param {any} v: any variable
 * @return {string} : the type of v 
 */
function myTypeof2(v){
  //Object.prototype.toString.call(v) return a string: "[object Type]"
  const str = Object.prototype.toString.call(v).split(' ')[1];
  return str.slice(0, str.length - 1);
}

function fun(){};
let fun2 = function(){};
let var1 = undefined;
let var2 = null;
let var3 = "";
let var4 = 1;
let var5 = {};
let var6 = [];
let var7 = new Date();
let var8 = /i+/g
let var9 = true;
console.log(myTypeof1(fun))
console.log(myTypeof1(fun2))
console.log(myTypeof1(var1))
console.log(myTypeof1(var2))
console.log(myTypeof1(var3))
console.log(myTypeof1(var4))
console.log(myTypeof1(var5))
console.log(myTypeof1(var6))
console.log(myTypeof1(var7))
console.log(myTypeof1(var8))
console.log(myTypeof1(var9))
console.log(myTypeof2(fun))
console.log(myTypeof2(fun2))
console.log(myTypeof2(var1))
console.log(myTypeof2(var2))
console.log(myTypeof2(var3))
console.log(myTypeof2(var4))
console.log(myTypeof2(var5))
console.log(myTypeof2(var6))
console.log(myTypeof2(var7))
console.log(myTypeof2(var8))
console.log(myTypeof2(var9))
console.log(myTypeof2(var3));
