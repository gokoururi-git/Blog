## 问题背景
由于移动端的click事件的效果是双击画面会有放大效果，所以为了监听双击事件不得不在第一次点击屏幕之后等待300ms来判断有没有第二次点击

## 解决方法：
1. meta标签user-scalable=no

2. fastclick.js

## 引申

面试题：移动端touch事件有穿透（点透）的问题，该怎么解决？

问题的出现：

情景一：蒙层绑定touch事件实现点击关闭，底部某些元素绑定click事件（比如a是天然的click事件）因为click事件有延迟效果，但是touch事件没有，在这300ms的时间差里，touch事件先将遮罩去掉，然后click事件才发生，便有了“穿透”的效果（注意这不是冒泡）

具体解决办法：
1. touch事件开始时阻止默认行为event.preventDefault()
2. 引入fastclick