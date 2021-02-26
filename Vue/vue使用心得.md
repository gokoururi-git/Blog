## vue使用心得

### 一些错觉

如果有以下代码：

```js
<div :class="flag ? style1 : style2"></div>
//data:{ flag: true, style1: '', style2: '' }
```

在实际运行时会发现只有style1或者style2的变化不会引起class的变化,只有在flag变化的时候才会引起class的变化

### v-if 和 v-for 一起使用

效果为渲染出来的每一个item都有一样的v-if。平时应该避免:

在v-for的父元素使用v-if

每一个item都有一样的v-if的不好：无用的watcher增加，影响性能（特别是如果这个v-for非常庞大的话）