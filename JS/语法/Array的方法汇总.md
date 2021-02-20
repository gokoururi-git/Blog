## Array.prototype.finedIndex

原型：`Array.prototype.finedIndex((currElement, currindex, array)=>{return true/false}[,thisArg])`

返回第一个测试函数返回true的下标，没找到-1

## Array.prototype.indexOf

原型：Array.prototype.indexOf(item[, fromIndex])

提供了fromIndex就从array的fromIndex开始找item，没提供就从一开始找，返回找到的item的下标（`===`判断）

> 引申：String.prototype.indexOf一样

## Array.prototype.includes

原型：Array.prototype.includes(item[, fromIndex])

提供了fromIndex就从array的fromIndex开始找item，没提供就从一开始找，找到返回true，否则返回false，和indexOf不同的是includes对NaN也可检测

## Array.prototype.reduce

原型: Array.prototype.reduce(callback(accumulator, currentValue[, currentIndex[, array]]), [, initialValue]);

IE9支持，所以几乎没有兼容性问题

首先，reduce和数组5大方法不一样，5大方法第二个参数是this，而reduce不同，第二个参数是初始值，而且reduce也不支持设置this。

对于**初始值**，他有以下作用：

- 如果没有提供，那么会将array[0]作为acc, array[1]作为curr（执行回调函数len-1次）

- 如果提供了，那么会将提供的值作为acc，array[0]作为curr（执行回调函数len次）

