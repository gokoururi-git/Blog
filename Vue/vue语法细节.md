 ## 分不了类的注意事项:
 - class的对象语法允许和class并存。
 - **由于 JavaScript 的限制，Vue 不能检测数组和对象的变化**

## vue规则
父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。

## 计算属性vs自己写变量和方法：
计算属性是依据他们的响应式依赖进行缓存，有缓存的作用
  
而自己写变量和方法是每次获取数据的时候都要执行一遍函数

## v-bind:style：
- 它是一个JS对象，css属性命名采用了驼峰命名法。
- 当 v-bind:style 使用需要添加浏览器引擎前缀的 CSS property 时，如 transform，Vue.js 会自动侦测并添加相应的前缀
## **Key的作用：**  
Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。这么做除了使 Vue 变得非常快之外，还有其它一些好处。例如，如果你允许用户在不同的登录方式之间切换：
```html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address">
</template>
```
那么在上面的代码中切换 loginType 将不会清除用户已经输入的内容。因为两个模板使用了相同的元素，
`<input>`不会被替换掉——仅仅是替换了它的 placeholder。

这样也不总是符合实际需求，所以 Vue 为你提供了一种方式来表达“这两个元素是完全独立的，不要复用它们”。只需添加一个具有唯一值的 key attribute 即可

## 部分的高效替换：
```javascript
example1.items = example1.items.filter(function (item) {
  return item.message.match(/Foo/);
})
```
替换你可能认为这将导致 Vue 丢弃现有 DOM 并重新渲染整个列表。幸运的是，事实并非如此。Vue 为了使得 DOM 元素得到最大范围的重用而实现了一些智能的启发式方法，所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作

## v-show

注意，v-show 不支持 <template> 元素

## v-if和v-for一起使用：
注意我们不推荐在同一元素上使用 v-if 和 v-for, 当它们处于同一节点，v-for 的优先级比 v-if 更高，这意味着 v-if 将分别重复运行于每个 v-for 循环中。当你只想为部分项渲染节点时，这种优先级的机制会十分有用，如下:
```html
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo }}
</li>
```
上面的代码将只渲染未完成的 todo。

而如果你的目的是有条件地跳过循环的执行，那么可以将 v-if 置于外层元素 (或 `<template>`) 上

## 表单绑定 --- v-model

v-model 会忽略所有表单元素的 value、checked、selected attribute 的初始值而总是将 Vue 实例的数据作为数据来源。你应该通过 JavaScript 在组件的 data 选项中声明初始值。

对于需要使用输入法 (如中文、日文、韩文等) 的语言，你会发现 v-model 不会在输入法组合文字过程中得到更新。如果你也想处理这个过程，请使用 input 事件。

## 使用事件修饰符时顺序很重要：

相应的代码会以同样的顺序产生。因此，用 v-on:click.prevent.self 会阻止所有的点击，而 v-on:click.self.prevent 只会阻止对元素自身的点击。


## 在工程中向真实DOM渲染的两种处理方法

### 第一种方法是runtime-compiler。他的过程是这样的:

templateVue -> ast -> render -> VDOM -> UI

首先Vue会先把模板存储在vm.options.template里，然后进行解析，结果是ast(abstract syntax tree)抽象语法树，解着vue会对ast进行编译，结果是vm.options.render()这个函数，他能进行将已有数据转化为虚拟DOM的操作，而vue再根据虚拟DOM树便可以渲染出最后的真实DOM，也就是UI。

### 第二种方法是runtime-only。他的过程是这样的：

render -> VDOM -> UI



### 两种方法的区别是
1. 在vue-cli中的体现是其他地方都一样，只是main.js不同。
```js
// runtime-compiler 的 main.js
new Vue({
  el:'app',
  template:'<App/>',
  components: {App}
})
// runtime-only 的 main.js
new Vue({
  el:'app',
  render: h => h(App)
  //render: render(h){ return h(App) }
  //其实这个h函数就是createElement('h2',{class: 'header'},['hello', createElement(...)])
  //createElement(还可以直接传入vue实例（比如import的组件）)
})
```
2. runtime-only模式最终打包之后的文件更小

## runtime-only模式下.vue文件中的template怎么处理了？
答：vue-template-compiler这个组件在将.vue文件对应的组件exports时，生成了带有这个组件template信息的render函数，在使用这个组件时，导入的变量就是已经含有template信息的变量，所以可以在使用时直接render渲染。