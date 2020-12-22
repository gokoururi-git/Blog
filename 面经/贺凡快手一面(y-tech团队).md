## y-tech

1. href和src的区别

2. 第一问的换个问法，为什么css样式放在上面，js放在下面（主要和第一问有关）

3. cookie和localStorage、sessionStorage和区别，cookie是谁创建的？cookie能够被其他域名访问吗？localStorage和sessionSorage能被拿到吗？

4. 说下绝对定位，各个属性的定义和概念，区别

5. 写水平垂直居中

6. eventloop，什么叫宏任务什么叫微任务

7. 给了个宏任务和微任务的代码，说输出

   ```js
   console.log('one');
   
   setTimeout(function() { 
    console.log('two'); 
   }, 0); 
   
   Promise.resolve().then(function() { 
    console.log('three'); 
   })
   console.log('four');
   ```

   

8. 说下promise相关的api，说下promise.all的原理

9. 说下js的类型

10. 怎么判断变量是一个数组

11. 从上题引出，instanceof，写一个函数模拟实现instanceof，说下Object.prototype.toString.call怎么做的

    我写的

    ```js
    function instanceof(left,right){
        let B = right.prototype;
        left=Object.getPrototypeof(left)
        while(left != null){
            if(left!==B){
                 left=Object.getPrototypeof(left);
            }else{
                return true;
            }
        }
        return false;
    }
    ```

    12. 说下call、apply、bind，手写bind（不能用apply），所以还要手写apply，为什么bind后面那一步要继承下上面的self.prototype？

        ```js
        Function.prototype.apply=function(context,arg){
            if(typeof this !== 'function'){
                throw 'xxx'
            }
            
            let context = context || window;
            let fn = Symbol('fn');
            context[fn]=this;
            const res= context[fn](arg);
            delete context[fn];
            return res;
        }
        Function.prototype.bind=function(context,...args1){
            if(typeof this !== 'function'){
                throw 'xxx'
            }
            let self =this;
            let fbound = function(...args2){
                if(this instanceof fbound){
                    self.apply(this,[...args1,...args2]);
                }else{
                    self.apply(context,[...args1,...args2]);
                }
            }
            fbound.prototype = Object.create(self.prototype);
            return fbound;
        }
        ```

        

    13. Object.create做了什么事情（上题引出）

    14. 列举常用的http方法并介绍get与post请求的区别，options做了什么事情

    15. http常用的状态码