# ES6一些方法/语法糖实现机制

1. 拓展运算符`...`

   内部通过for...of循环实现

2. `async` 和`await`

   ```js
   async function fun1(){
     await console.log(1)
   }
   ```

   转换为ES5：

   ```js
   "use strict";
   
   var fun1 = function () {
     var _ref = _asyncToGenerator( /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
       return regeneratorRuntime.wrap(function _callee$(_context) {
         while (1) {
           switch (_context.prev = _context.next) {
             case 0:
               _context.next = 2;
               return console.log(1);
   
             case 2:
             case "end":
               return _context.stop();
           }
         }
       }, _callee, this);
     }));
   
     return function fun1() {
       return _ref.apply(this, arguments);
     };
   }();
   
   function _asyncToGenerator(fn) {
     return function () {
       var gen = fn.apply(this, arguments);
       return new Promise(function (resolve, reject) {
         function step(key, arg) {
           try {
             var info = gen[key](arg);
             var value = info.value;
           } catch (error) {
             reject(error);
             return;
           }
           if (info.done) {
             resolve(value);
           } else {
             return Promise.resolve(value).then(function (value) {
               step("next", value);
             }, function (err) {
               step("throw", err);
             });
           }
         }
         return step("next");
       });
     };
   }
   ```

3. continue...