# js代码的执行过程

## 正文

温馨提示：点击下面的步骤中一些概念之后页面可以跳转到对其解释的地方

### 1. 检查当前代码块内有没有语法错误（不分作用域块全部扫描）

   ```js
   console.log("hello");
   asdasd asdads //代码会直接报错，不输出hello
   ```
### 2. 创建执行上下文栈

### 3. 为当前代码块创建**执行上下文**<a id="context-text" href="#context">[解释]</a>

#### 对于函数执行上下文：

##### (1) 将当前函数的调用者赋值到this

##### (2) 初始化当前上下文的**作用域链**<a id="scope-text" href="#scope">[解释]</a>

将`父级执行上下文`的`作用域链`**一层深拷贝**<a id="deep-copy-with-one-layer-text" href="#deep-copy-with-one-layer-note">[解释]</a>后赋值给`当前执行上下文`的`作用域链`并且将`父级执行上下文`的`变量对象`压入`当前执行上下文`的`作用域链`的栈顶。

##### (3) 扫描`变量的声明`和`函数的声明`和`class的声明`之后对`执行上下文`的**变量对象**<a id="vo-text" href="#vo">[解释]</a>初始化：

###### 首先需要注意**函数内的以及`class`内的（其实class也是函数）变量不会被扫描**，但是**if里的变量和for的`()`和`循环体`里面的变量会被扫描**

```js
console.log(i); if(false){ var i = 0; } //没报错，输出undefined
console.log(i); for(var i = 0; i < 5; i++){}//没报错，输出undefined
console.log(j); for(var i = 0; i < 5; i++){ var j = 0;}//没报错，输出undefined
console.log(i); (()=>{var i = 0;})()//报错 i is not defined
console.log(i); class a { i(){} }//报错 i is not defined
```

- 对于`let`，`const`，`class`类型的声明，不管在代码中被赋予普通变量还是函数变量，都先设置不可写不可读

- 对于`var`类型的声明，不管在代码中被赋予普通变量还是函数变量，都先赋值`undefined`

- 对于`function`类型的声明，进行完整赋值（需要特殊说明一下，即使函数内部使用了没有声明的变量（包括函数变量）也会正常赋值，就好像函数内部的代码被当作字符串处理了一样（这个说法无考证），对于它里面的无定义检测会在它被执行的时侯再进行）
  ```js
  function fun(){ a() }//无报错
  ```

###### 其中：如果遇到重复变量名：

- 两个重复声明的声明类型有`let`，`const`，`class`：报错

	```js
	function var0(){}; let var0;//error
	let var1; function var1(){}//error
	var var2; let var2;//error
	let var3; var var3;//error
	```

- 两个重复声明的声明类型都不是`let`，`const`，`class`

  - 如果重复声明中有`function`，那么按`function`声明

  ```js
  var a; function a(){}; console.log(typeof a);//function
  ```

  - 如果重复声明都是`var`或者都是`function`，那么忽略后面的声明


#### 全局执行上下文的创建过程与函数执行上下文的创建过程的区别

   `(1)`：全局上下文的this是`window`

   `(2)`：全局上下文的作用域链为空栈

   `(3)`：全局上下文的变量对象中没有`arguments`和形式参数

### 4. 执行代码

**忽略所有上一步涉及的声明操作（注意包含函数声明），同时恢复let，const，class的可写可读**

这也将意味着：

```js
var var1 = function(){}; var var1; console.log(typeof var1);//function
```

这种只声明的被忽略之后就什么都不做了，而其他带有赋值操作的声明将会以赋值操作进行，如果有类型转换也会进行转换

**如果遇到同步函数调用，那么进入该函数，按上述步骤建立这个函数的执行上下文并执行，等这个函数执行完毕之后再执行当前函数剩下的代码**

**如果遇到异步函数调用，那么将这个异步函数添加到任务队列之后继续执行当前函数剩下的代码**

### 5. 当前函数执行完毕，当前执行上下文出栈（全局上下文出栈就相当于结束运行）



------

# 概念解释

## 执行上下文（context）

<a id="context" href="#context-text">点击返回</a>

执行上下文有函数执行上下文和全局执行上下文之分，这两个执行上下文都是由变量对象，作用域链，this组成，区别体现在

```js
context:{
  VO,
  scope,
  this
}
```

## 变量对象（VO/AO）

<a id="vo" href="#vo-text">点击返回</a>

创建前大概是这个样子：

```js
//假设有函数function fun(a,b,c){ var funvar = 2;}, 调用为fun(1,2,3);
VO:{
  arguments:{
    0:1，
    1:2，
    2:3，
    length:3
  },
  a:1,
  b:2,
  c:3,
  funvar:undefined
}
```

创建之后就仅仅是把`funvar`赋值完整了

## 作用域链（scope）

<a id="scope" href="#scope-text">点击返回</a>

作用域链可以描述为用来存储**父级**作用域（当前作用域的这个角色由当前作用域的变量对象承担）的**变量对象**的一个**栈**，之所以说它是栈，是因为元素顺序是有要求的。

## 一层深拷贝

<a id="deep-copy-with-one-layer-note" href="#deep-copy-with-one-layer-text">点击返回</a>

浅拷贝：

```js
let obj = {
  name:"obj",
  obj2:{
    name:"obj2"
  }
}
//发生浅拷贝:
let copy = obj;
//其效果如下
copy.name = "changed";
copy.obj2.name = "changed";
console.log(obj.name);//changed
console.log(obj.obj2.name);//changed
```

深拷贝：

```js
let obj = {
  name:"obj",
  obj2:{
    name:"obj2"
  }
}
//发生深拷贝：
let copy = JSON.parse(JSON.stringify(obj));
//其效果如下
copy.name = "changed";
copy.obj2.name = "changed";
console.log(obj.name);//obj
console.log(obj.obj2.name);//obj2
```

一层深拷贝：

```js
let obj = {
  name:"obj",
  obj2:{
    name:"obj2"
  }
}
//发生一层深拷贝：
let copy = {
  name:obj.name,
  obj2:obj.obj2
};
//其效果如下
copy.name = "changed";
copy.obj2.name = "changed";
console.log(obj.name);//obj
console.log(obj.obj2.name);//changed
```

> 一层深拷贝也可以这么做：`let copy = Object.assign({}, obj);`



------

参考《[我用了两个月的时间才理解 let](https://zhuanlan.zhihu.com/p/28140450)》、《[[译] 揭秘变量提升](https://juejin.cn/post/6844903865196756999)》