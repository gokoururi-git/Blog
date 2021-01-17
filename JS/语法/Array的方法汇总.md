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

