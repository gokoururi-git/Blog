# Object方法汇总

## Object.assign()

原形：Object.assign(target, sources1, sources2,...)

功能：将source1，2等汇总整合到target并返回

## Object.create()

原形：Object.create(proto[, propertiesObject])

功能：以proto对象为原形创建一个新对象，如果提供了propertiesObject，就给这个对象进行初始化。

解释一下propertiesObject：它是一个对象，里面是多个和[Object.defineProperty](#Object.defineProperty())的第三个参数一样的描述符

## Object.getPrototypeOf()

原形：Object.getPrototypeOf(obj)

功能：传入一个对象，返回这个对象的原型，如果没有继承属性则返回null (\_\_proto\_\_的代替)

## Object.getOwnPropertySymbols()

原形：Object.getOwnPropertySymbols(obj)

功能：返回在传入的对象自身上找到的所有 Symbol 属性的**数组**。

## Object.prototype.hasOwnProperty()

原形：Object.prototype.hasOwnProperty("prop")

功能：检测一个对象有没有叫`prop`的属性(**不考虑原型**)，注意传入的是一个**字符串**，返回布尔值，`true`表示有

```js
let obj = {}
obj.hasOwnProperty("prop")//false
```

## Object.defineProperty()

原形：Object.defineProperty(obj, 'propertyName',属性描述符)

功能：配置对象obj的一个叫propertyName的属性的属性

属性描述符：

它应该是这样的

```js
p: {
  value: 42, //
  writable: true,
  enumerable: true,
  configurable: true,
  set:function(){},
  get:function(){}
}
```

- configurable

  当且仅当该属性的 `configurable` 键值为 `true` 时，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除。

- enumerable

  当且仅当该属性的 `enumerable` 键值为 `true` 时，该属性才会出现在对象的枚举属性中。

- value

  该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。

- writable

  当且仅当该属性的 `writable` 键值为 `true` 时，属性的值，也就是上面的 `value`，才能被[`赋值运算符`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Assignment_Operators)改变。

- get

  属性的 getter 函数，如果没有 getter，则为 `undefined`。当访问该属性时，会调用此函数。执行时不传入任何参数，但是会传入 `this` 对象（由于继承关系，这里的`this`并不一定是定义该属性的对象）。该函数的返回值会被用作属性的值。

- set

  属性的 setter 函数，如果没有 setter，则为 `undefined`。当属性值被修改时，会调用此函数。该方法接受一个参数（也就是被赋予的新值），会传入赋值时的 `this` 对象。

默认值：

- 拥有布尔值的键 `configurable`、`enumerable` 和 `writable` 的默认值都是 `false`。
- 属性值和函数的键 `value`、`get` 和 `set` 字段的默认值为 `undefined`。

但是要注意描述符有两类：数据描述符和存取描述符

table: 描述符可拥有的键值

| 类型       | configurable | enumerable | value  | writable | get    | set    |
| ---------- | ------------ | ---------- | ------ | -------- | ------ | ------ |
| 数据描述符 | 可以         | 可以       | 可以   | 可以     | 不可以 | 不可以 |
| 访存描述符 | 可以         | 可以       | 不可以 | 不可以   | 可以   | 可以   |

如果一个描述符不具有 `value`、`writable`、`get` 和 `set` 中的任意一个键，那么它将被认为是一个数据描述符。如果一个描述符同时拥有 `value` 或 `writable` 和 `get` 或 `set` 键，则会产生一个异常。



