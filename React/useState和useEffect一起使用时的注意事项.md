# useState和useEffect一起使用时的注意事项

对于useState，它会在jsx中收集依赖，每当改变state的时候，就会批量更新这些依赖, 但是需要注意，任何其他hooks方法中用到state是不会被当做依赖收集的，这个时候就需要我们使用useEffect的第二个参数
来实现state变化执行对应的Effect。

```js
const [test, setTest] = useState(0);

useEffect(() => {
  console.log('第一次加载时的值', test);
  setInterval(() => {
    console.log('test: ', test);
    setTest(test + 1);
  }, 500);
}, []);
```

输出结果一直为0。因为这里传入的第二个参数是空数组，而上面说了，Effect并不作为state

useEffect的工作原理为：触发页面刷新的因素绝大部分就是setState方法的调用，而页面刷新的原理是重新进行一次组件函数的调用，传入新的props