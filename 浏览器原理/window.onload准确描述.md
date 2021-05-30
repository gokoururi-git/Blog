# window.onload准确描述

## 浏览器加载结束时发生的事[参考](https://html.spec.whatwg.org/multipage/parsing.html#the-end)

一旦user agent停止解析文档，它必须按以下步骤执行

1. 将[插入点](#插入点)设置为undefined.

2. 将当前文档准备状态更改为`interactive`

3. 将[开放元素栈](#开放元素栈)的所有节点都弹出

4. 

## 名词解释

### 插入点

英文：insert point

含义：插入点是指使用document.write插入内容时实际插入内容的位置（在某个字符之前或者输入流结尾之前）。插入点不与输入流的绝对偏移位置相关，而是与紧随其后的字符的位置相关。它的初值是undefined。

### 开放元素栈

英文: stack of open elements

#### 含义
开放元素栈的初值为空栈，栈的增长方向向下。栈中最上面的节点是第一个被加入栈中的。

对于`html`节点，无论它是怎么被创建的，它都是栈中最上面的元素。它只可能在解析器的结束过程中弹出。