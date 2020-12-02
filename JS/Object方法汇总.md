# Object方法汇总

## Object.assign()

原形：Object.assign(target, sources1, sources2,...)

功能：将source1，2等汇总整合到target并返回

## Object.getPrototypeOf()

原形：Object.getPrototypeOf(obj)

功能：传入一个对象，返回这个对象的原型，如果没有继承属性则返回null (\_\_proto\_\_的代替)

## Object.getOwnPropertySymbols()

原形：Object.getOwnPropertySymbols(obj)

功能：返回在传入的对象自身上找到的所有 Symbol 属性的**数组**。

