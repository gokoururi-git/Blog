# ES6学习总结

## Set

### Set也可以用`...`

```js
let set = new Set(['red', 'green', 'blue']);
let arr = [...set];
// ['red', 'green', 'blue']
```

这样的话，通过很方便得将一个Set转化成数组而使用map，filter等数组方法了

### Set的遍历顺序是add的顺序

```js
let set = new Set(['red', 'green', 'blue']);

for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.values()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
```

## Weakset

### WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。

- 首先，WeakSet 的成员**只能是对象**，而不能是其他类型的值。

- 其次，WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。

### WeakSet 没有`size`属性，没有办法遍历它的成员

### 应用

- WeakSet 不能遍历，是因为成员都是弱引用，随时可能消失，遍历机制无法保证成员的存在，很可能刚刚遍历结束，成员就取不到了。WeakSet 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。

## Map

### 用法

- `map.has(key)`：有没有`key`这个键，bool
- `map.size`:返回键值对的数量
- `map.set(key, value)`重复的覆盖
- `map.get(key)`没有返回`undefined`
- `map.delete(key)`
- `map.clear()`
- 对于用对象作为键的，实际上作为键的是引用值（地址）

## Weakmap

`WeakMap`只接受对象作为键名（`null`除外），不接受其他类型的值作为键名。

用处

- 与weakset一样防止内存泄漏
- 部署私有属性

