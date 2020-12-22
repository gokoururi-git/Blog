# array的内存分配

浏览器为array分配内存时会检查类型是否一致，如果一致的话就会分配连续的内存，如果不一致的话就会以哈希映射的方式进行分配。

另外，array的键有以下规律：

```js
let arr = []
arr["first"] = 1
console.log(arr.length)//0
arr["0x12"] = 1
console.log(arr.length)//0
arr["123x"] = 1
console.log(arr.length)//0
arr["1.2"] = 1
console.log(arr.length)//0
arr[".2"] = 1
console.log(arr.length)//0
arr["012"] = 1
console.log(arr.length)//0
arr["123abc"] = 1
console.log(arr.length)//0
arr[""] = 1
console.log(arr.length)//0
arr["12"] = 1
console.log(arr.length)//13
```

总结：仅当[""]里面的字符串是简简单单的十进制数字，才会将其转换为数字下标。

**arr["property"]**（十进制数字的字符串除外）虽然可以增加属性，但是其原理其实是通过arr.property增加的，**不会**对length产生影响，[12]或者["12"]才会对length产生影响。

另外有文章说数组的下标是字符串类型，但是我觉得还有待考证
