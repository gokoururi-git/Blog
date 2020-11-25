1. 在浏览器中
```js
setTimeout(function(){
  console.log(this === window);
},200);
```
和
```js
setTimeout(()=>{
  console.log(this === window);
},200);
```
都输出true

但是在node中
```js
setTimeout(function(){
  console.log(this);
},200);
```
输出了一个Timeout对象
```js
setTimeout(()=>{
  console.log(this);
},200);
```
输出了{}
