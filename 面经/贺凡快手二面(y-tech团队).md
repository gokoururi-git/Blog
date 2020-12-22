## 快手二面（y-tech）

1. 介绍下computed和watch，并说下它们使用的场景

2. v-if和v-show的区别

3. 组件里的data里面能直接返回一个对象吗？根实例可以返回一个对象吗？

4. key的作用？为什么说不建议设置key为index，如果标记了key在一个数组里面删除了某项，会不会有什么影响？

5. 组件间的通信

6. vuex的源码了解过吗？原理了解吗？

7. vue-router的两种模式，hash和history，得很了解这两种模式的区别

8. vue3了解吗？

9. vue3的数据劫持了解吗？数组方法劫持那块vue2和vue3的不同

10. vue的运行机制，从init那块说起

11. 什么时候会触发那个get方法，在什么时候读？

12. 出了个简单的observer

    ```js
    题目：
    // 实现observer
    class Vue {
        constructor(options) {
            this._data = options.data;
            this.observer();
        }
      
    }
    const ins = new Vue({
        data: {
            name: "Tom",
            age: "18"
        }
    });
    ins._data.name = "Jerry" // 打印：data中的name被修改为Jerry了
    ins._data.age = "20" // 打印：data中的age被修改为20了
    ```

    ```js
    实现：
    class Vue {
      constructor(options) {
        this._data = options.data;
        this.observer();
      }
      observer() {
        let keys = Object.keys(this._data);
        keys.forEach((key) => {
          let val = this._data[key];
          Object.defineProperty(this._data, key, {
            configurable: true,
            get() {
               return val;
            },
            set( newValue) {
              if (newValue !== val) {
                val = newValue;
                console.log(`data中的${key}被修改为了${newValue}`)
              }
            }
          })
        })
      }
    }
    const ins = new Vue({
      data: {
        name: "Tom",
        age: "18"
      }
    });
    ins._data.name = "Jerry" // 打印：data中的name被修改为Jerry了
    ins._data.age = "20" // 打印：data中的age被修改为20了
    
    ```

13. 实现一个拖拽，一个块被点击后跟着鼠标动，实现一个拖拽的时候需要考虑什么？

14. 实现一个轮播图的思路，滑到最后一张的时候如何平滑地到第一张？

15. 用过node.js吗？

