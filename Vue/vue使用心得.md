## vue使用心得

### 一些错觉

如果有以下代码：

```js
<div :class="flag ? style1 : style2"></div>
//data:{ flag: true, style1: '', style2: '' }
```

在实际运行时会发现只有style1或者style2的变化不会引起class的变化,只有在flag变化的时候才会引起class的变化