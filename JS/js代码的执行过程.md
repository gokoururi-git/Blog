# js代码的执行过程

## 正文

温馨提示：点击下面的步骤中一些概念之后页面可以跳转到对其解释的地方

### 1. 检查当前代码块内有没有语法错误（不分作用域块全部扫描）

   ```js
   console.log("hello");
   asdasd asdads //代码会直接报错，不输出hello
   ```
### 2. 如果当前是全局执行环境，创建执行上下文栈

### 3. 为当前代码块创建**执行上下文**<a id="context-text" href="#context">[解释]</a>

#### 对于函数执行上下文：

##### (1) 将当前函数的调用者赋值到this（有的时候是被闭包调用的，需要注意，比如bind）

##### (2) 按如下规则扫描变量的声明之后对<u>变量对象</u><a id="vo-text" href="#vo">[解释]</a>初始化：

表格：是否会被当前过程扫描（非严格模式，Chrome 87验证）

|                | if(...){}内 | if(){...}内 | for(...){}内 | for(){...}内 | 函数体内 | 仅仅{}内 | 当前作用域内 | (...)()内  |
| -------------- | ----------- | ----------- | ------------ | ------------ | -------- | -------- | ------------ | ---------- |
| `var`          | 编译不通过  | √           | √            | √            | X        | √        | √            | 编译不通过 |
| `function`     | X           | √           | X            | √            | X        | √        | √            | X          |
| `let`和`const` | 编译不通过  | X           | X            | X            | X        | X        | √            | 编译不通过 |
| `class`        | X           | X           | X            | X            | X        | X        | √            | X          |

注：(...)()内是指`console.log(fun); (function fun(){})();`类似这样的。（也叫IIFE，立即调用函数表达式）

扫描干了这些事：

- 对于`let`，`const`，`class`类型的声明，不管在代码中被赋予普通变量还是函数变量，都先设置不可写不可读

- 对于`var`类型的声明，不管在代码中被赋予普通变量还是函数变量，都先赋值`undefined`

- 对于`function`类型的声明，进行完整赋值（需要特殊说明一下，即使函数内部使用了没有声明的变量（包括函数变量）也会正常赋值，就好像函数内部的代码被当作字符串处理了一样（这个说法无考证），对于它里面的无定义检测会在它被执行的时侯再进行）
  ```js
  function fun(){ a() }//无报错
  ```
  
  对函数变量赋值完成之后，还需要创建这个函数的**作用域链**<a id="scope-text" href="#scope">[解释]</a>（此时并不完整，还需等待它被调用执行后再加一个对应的执行上下文的变量对象才完整），具体地：会给当前的函数变量一个[[scope]]属性，这个属性指向一个数组，用于保存所有父级作用域链的变量对象，它**浅拷贝**<a id="deep-copy-with-one-layer-text" href="#deep-copy-with-one-layer-note">[解释]</a>了当前执行上下文的`scope`。（需要理解的是这是创建这个函数的执行上下文前的准备工作）
  
  ```js
  function a(){}
  a.[[scope]] = callerContext(当前函数的调用者的执行上下文).scope.sclice()
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

##### (3) 初始化当前上下文的**作用域链**

将当前函数对象的[[scope]]属性**浅拷贝**到当前执行上下文的`scope`，然后将`(2)`创建好的变量对象压栈到栈顶

代码描述：

```js
currentContext.scope = currentFunction.[[scope]].slice();
currentContext.scope.push(currentContext.VO);
```

#### 全局执行上下文的创建过程与函数执行上下文的创建过程的区别

   `(1)`：全局上下文的this是`window`

   `(2)`：全局上下文的变量对象中没有`arguments`和形式参数，另外，全局上下文的[[scope]]是空数组

### 4. 将当前执行上下文压入执行上下文栈

### 5. 执行代码

**忽略所有上一步涉及的声明操作（注意包含函数声明，但是不包含函数内部以及{}内部的声明），同时恢复`let`，`const`，`class`的可写可读**

这也将意味着：

```js
var var1 = function(){}; var var1; console.log(typeof var1);//function
```

这种只声明的被忽略之后就什么都不做了，而其他带有赋值操作的声明将会以赋值操作进行，如果有类型转换也会进行转换

**如果遇到同步函数调用，那么进入该函数，按上述步骤建立这个函数的执行上下文并执行，等这个函数执行完毕之后再执行当前函数剩下的代码**

**如果遇到了{}的话，一般的情况就是会重新扫描一遍，具体如下，其他的这块就没再仔细研究了，感觉毕竟用得不多**

```js
let tmp;
{
  tmp =  0;//死区所以报错，报的错和tmp = 0; let tmp;是一个错
  let tmp;
}
```

**如果遇到异步函数调用，那么将这个异步函数添加到任务队列之后继续执行当前函数剩下的代码**

**如果遇到当前VO中没有定义，但是有对其进行赋值操作的语句，也会将其添加到VO**

### 6. 当前函数执行完毕，当前执行上下文出栈（全局上下文出栈就相当于结束运行）

需要注意：全局上下文出栈不代表所有信息都没了，每个函数对象都还保存着[[scope]]属性，正是因为这个原因，再结合创建执行上下文的时候要根据这个属性来初始化scope，所以函数的作用域在定义的时候就被决定了，也是因为有[[scope]]的存在，所以才把父作用域的变量对象保存下来了，所以才会有闭包的存在。



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

## 浅拷贝

<a id="deep-copy-with-one-layer-note" href="#deep-copy-with-one-layer-text">点击返回</a>

简单引用拷贝：

```js
let obj = {
  name:"obj",
  obj2:{
    name:"obj2"
  }
}
//发生简单引用拷贝：
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

浅拷贝：

```js
let obj = {
  name:"obj",
  obj2:{
    name:"obj2"
  }
}
//发生浅拷贝：
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

> 浅拷贝也可以这么做：`let copy = Object.assign({}, obj);`
> 另外，对于数组也可以：`let copy = array.concat()`或者`let copy = array.slice()`



最后，可以用一段代码检测一下：

```js
var a = 0; function a(){}; console.log(typeof a);
```

正确答案是number



------

参考《[我用了两个月的时间才理解 let](https://zhuanlan.zhihu.com/p/28140450)》、《[[译] 揭秘变量提升](https://juejin.cn/post/6844903865196756999)》、《[ECMAScript6入门](https://es6.ruanyifeng.com/#docs/let#%E6%9A%82%E6%97%B6%E6%80%A7%E6%AD%BB%E5%8C%BA)》