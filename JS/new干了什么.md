# new 干了什么
对于
```js
function Person(name){
  this.name = name;
}
new Person("cat");
```
new 干了这些事：
```js
function myNew(constructor, ...args){
  const obj = Object.create(constructor.prototype);
  let temp = constructor.apply(obj, args);
  let type = typeof temp;
  return  type === 'function' || 'object' && temp !== null ? temp : obj;
  //总之如果返回值是对象，那么返回它，否则返回自己建的obj，引申：typeof new Array() 返回 'object'
}

function Person(name){
  this.name = name;
  this.tellName = function(){
    return this.name;
  }
}

console.log(myNew(Person, "lihua").tellName());//lihua
```