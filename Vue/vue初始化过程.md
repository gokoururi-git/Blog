# Vue的生命周期

## 单实例

### 创建过程

1. 创建Vue实例

2. `beforeCreate`

3. 初始化

   为`data选项`响应式化，处理`watcher`和`event`。其中响应式化是指给`Object.defineProproty`的`setter`函数插入一个更新视图的步骤。

4. `created`：结束初始化

5. `beforeMounte`（Vue SSR不可用）

6. 挂载（将Vue实例和DOM产生联系）

   如果没有提供`render function`：

   - parse：用正则表达式将模板以及模板中的指令、属性转化为AST
   - optimize：标记静态节点（`isStatic`）
   - generate：将AST转化为`render function`（字符串形式）

   有的话就直接跳过

7. `mounted`（**不会**保证所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以在 `mounted` 内部使用 [vm.$nextTick](https://cn.vuejs.org/v2/api/#vm-nextTick)）（Vue SSR不可用）

### 更新过程（待修改）

1. 首先在挂载完成之后，第一次执行render function时，因为要读取data，所以会在getter里进行**依赖收集**，即，看哪些地方用到了data中的对象，就把这些地方存到队列里成为这个对象（Subject）的watcher队列（Dep的subs）。

2. data改变的时候我们并不会立即调用这个watch的run，我们会建立一个map存放需要改变的所有<u>watch的id</u>，这时候当有重复的watch进来，我们调用update方法，当某个时机来临，我们再对这个队列的所有watch进行run。

   > 为什么重复的watch可以忽略？因为watch在这里只是用来标识视图的哪个地方需要改动（更改页面的watcher是render-watcher，没有缓存数据），实际上值的变换不会导致watch的改变，怎么获取新的数据是直接去找data的。watch.update的作用就是如果自己的id在map里面不存在就加进去，如果有就忽略。而watcher.run()才是真正的改变render function。

3. 在那个时机来临时，我们调用render function，生成新VNode之后，我们进行新旧VNode的比较，这个过程叫patch，利用的算法是diff，最终达到按需变化。diff采取相同才比较子节点，同一节点子节点采用双指针配合key进行对比

### 销毁过程（待补充）

## 父子实例

### 创建过程

父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted

### 更新过程

- 子组件更新过程

  父beforeUpdate->子beforeUpdate->子updated->父updated

- 父组件更新过程

  父beforeUpdate->父updated

### 销毁过程

父beforeDestroy->子beforeDestroy->子destroyed->父destroyed