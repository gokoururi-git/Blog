# 当浏览器遇到`script`标签做了什么

## 正文

温馨提示：上面的步骤中的一些概念可以点击之后页面跳转到相应位置

### 1. 检查当前`script`标签内有没有语法错误

   ```js
   console.log("hello");
   asdasd asdads //代码会直接报错，不输出hello
   ```
### 2. 创建执行上下文栈

### 3. 为当前`script`创建<a id="ret1" href="#context">执行上下文</a>

#### 对于函数执行上下文：

##### (1) 将当前函数的调用者赋值到this

##### (2) 初始化当前上下文的<a id="ret3" href="#scope">作用域链</a>

将`当前函数的调用者所在执行上下文`的`作用域链`**一层深拷贝**后赋值给`当前执行上下文`的`作用域链`并且将`当前函数的调用者所在执行上下文`的`变量对象`压入`当前执行上下文`的`作用域链`的栈顶。

##### (3) 扫描`变量的声明`和`函数的声明`之后对`执行上下文`的<a id="ret2" href="#vo">变量对象</a>初始化：

###### 首先需要注意**函数内的变量不会被扫描**，但是**if里的变量和for里面的变量会被扫描**

```js
console.log(i); if(false){ var i = 0; } //没报错，输出undefined
console.log(i); for(var i = 0; i < 5; i++){}//没报错，输出undefined
console.log(i); (()=>{var i = 0;})()//报错
```

- 对于`let`，`const`，`class`类型的声明，不管在代码中被赋予普通变量还是函数变量，都先设置不可赋值

- 对于`var`类型的声明，不管在代码中被赋予普通变量还是函数变量，都先赋值`undefined`

- 对于`function`类型的声明，进行完整赋值

###### 其中：如果遇到重复变量名：

- 两个重复声明的声明类型有`let`，`const`，`class`：报错

	```js
	function var0(){}; let var0;//error
	let var1; function var1(){}//error
	var var2; let var2;//error
	let var3; var var3;//error
	```

- 两个重复声明的声明类型都不是`let`，`const`，`class`：忽略后面的声明


#### 全局执行上下文的创建过程与函数执行上下文的创建过程的区别

   `(1)`：全局上下文的this是`window`

   `(2)`：全局上下文的作用域链为空栈

   `(3)`：全局上下文的变量对象中没有`arguments`和形式参数

### 4. 执行代码

**忽略所有上一步涉及的声明操作，同时恢复let，const，class的可写可读**

这也将意味着：

```js
var var1 = function(){}; var var1; console.log(typeof var1);//function
```

这种只声明的被忽略之后就什么都不做了，而其他带有赋值操作的声明将会以赋值操作进行，如果有类型转换也会进行转换

### 5. 当前函数执行完毕，当前执行上下文出栈（全局上下文出栈就相当于结束运行）





## 概念解释

### 执行上下文（context）<a id="context" href="#ret1">点击返回</a>

执行上下文有函数执行上下文和全局执行上下文之分，这两个执行上下文都是由变量对象，作用域链，this组成，区别体现在

```js
context:{
  VO,
  scope,
  this
}
```

### 变量对象（VO/AO）<a id="vo" href="#ret2">点击返回</a>

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

### 作用域链（scope）<a id="scope" href="#ret3">点击返回</a>

作用域链可以描述为用来存储**父级**作用域（当前作用域的这个角色由当前作用域的变量对象承担）的**变量对象**的一个**栈**，之所以说它是栈，是因为元素顺序是有要求的。

参考《[我用了两个月的时间才理解 let](https://zhuanlan.zhihu.com/p/28140450)》、《[[译] 揭秘变量提升](https://juejin.cn/post/6844903865196756999)》
