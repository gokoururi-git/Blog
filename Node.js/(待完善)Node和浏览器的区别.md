在浏览器中
```js
setTimeout(function(){
  console.log(this);
},200);
```
和
```js
setTimeout(()=>{
  console.log(this);
},200);
```
都输出window

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

还有：
```js
var name = "windowsName";
function fn() {
  var name = 'Cherry';
  innerFunction();
  function innerFunction() {
    console.log(this.name); // windowsName
  }
}
fn()
```
浏览器下执行输出windowName，node下输出undefined

究其原理：node没有window对象，待补充
