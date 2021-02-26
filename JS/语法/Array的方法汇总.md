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

## Array.prototype.flat

原型：Array.prototype.flat(depth)

将自身拍平指定层，并且删除多余部分

拍平：

```js
[1,[2,[3,[4]]]].flat(2);//[1, 2, 3, [4]]
```

删除多余部分

```js
[1,2,,3,4].flat()//[1, 2, 3, 4]
//注：
//虽然
[1,2,undefined,3,4].flat()//[1, 2, undefined, 3, 4]
//但是
[1,2,,3,4][2] === [1,2,undefined,3,4][2]//true
```

## Array.prototype.splice

原型: Array.prototype.splice(startIndex[, deleteCount[, ...addItems]]);

从指定的下标位置startIndex开始，删除deleteCount个元素，并在startIndex处增加后续的所有addItems。最终返回被删除了的元素组成的数组。

注意：

- 增加的items的部分的开始下标就是startIndex

    ```js
    [1,2,3,4,5,6,7,8].splice(3, 0, 9, 9, 9);//返回[]，原数组变为[1, 2, 3, 9, 9, 9, 4, 5, 6, 7, 8]
    [1,2,3,4,5,6,7,8].splice(3, 2, 9, 9, 9);//返回[4, 5]，原数组变为[1, 2, 3, 9, 9, 9, 6, 7, 8]
    ```

- 如果不想删除元素一定要加中间的0，不能空

- 后面两个都不写代表删除startIndex（包括）以后的所有元素

    ```js
    [1,2,3,4,5,6].splice(2);//返回[3,4,5,6], 原数组变为[1,2]
    ```

