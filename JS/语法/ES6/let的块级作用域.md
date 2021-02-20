## for的局部作用域

首先，for(){...}内部定义的变量当然是每一次循环都是一个新的变量，这个不用说，我们主要讨论for(...){}里面的变量的行为：

- 每次循环也是新的变量

  ```js
  let arr = [];
  for(let i = 0; i < 5; i++){
    arr[i] = function(){
      console.log(i);
    }
  }
  arr[2]();//2
  ```

  相对的：

  ```js
  let arr = [];
  for(var i = 0; i < 5; i++){
    arr[i] = function(){
      console.log(i);
    }
  }
  arr[2]();//4
  ```

  只是把let换成var，这里的就有很大的区别了。var的话这里是定义在全局对象window上的，而**每个**循环体内定义的函数的[[scope]]都引用了**同一个**window的VO，在函数的执行上下文创建的时候会把它放入作用域链中，所以，每个函数内部的i其实都指向了同一个i。所以最后不管是那个函数执行的时候都是自身vo找不到，然后沿着作用域链往上找，找到的都是同一个window的vo的i，所以输出都是4。

  而let就不会的原因是因为在每次循环执行之前都会重新定义for(...){}里面的变量，从而形成新的作用域，而不是每次都依赖同一个window的vo的i了（其实不管在哪里的let都不会挂载到window，这里window的vo并没有i）。

  > 既然每次都是独立的，那么i++的机制又是如何？
  >
  > 其实这里是JS引擎会记住之前的变量

- 相当于是for(){...}的父级作用域

  ```js
  for(let i = 0; i < 5; i++){
    let i = 'str';
    console.log(i);
  }
  //str str str str str
  ```

  可以看出来，for(...){}和for(){...}是相互独立的，所以用父子作用域来解释非常合适

## typeof在临时性死区的表现

```js
typeof undeclared_variable//undefined

typeof a;//error
let a;
```

## 其他情况

```js

function temp(x = y, y = 3){}
temp();//error

function temp(x = 3, y = x){}
temp();//ok

var x = x;//ok
let x = x;//error
```

