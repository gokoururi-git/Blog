```js
let instance = axios.create({});

instance.interceptor.request.use(function one(){
  console.log('request拦截器第一个成功函数');
}, function one(){
  console.log('request拦截器第一个失败函数');
});

instance.interceptor.request.use(function two(){
  console.log('request拦截器第二个成功函数');
}, function two(){
  console.log('request拦截器第二个失败函数');
});

instance.interceptor.response.use(function one(){
  console.log('response拦截器第一个成功函数');
}, function one(){
  console.log('response拦截器第一个失败函数');
});

instance.interceptor.response.use(function two(){
  console.log('response拦截器第二个成功函数');
}, function two(){
  console.log('response拦截器第二个失败函数');
});

instance({});
```

执行结果：

request拦截器第二个成功函数
request拦截器第一个成功函数
//发送请求
response拦截器第一个成功函数
response拦截器第二个成功函数

也其实是一个洋葱模型

![image-20210130185038542](D:\Documents\Study\blog\web\Blog\axios\拦截器的use顺序.assets\image-20210130185038542.png)

如果有一个失败就后续全部按reject执行

![image-20210130185358092](D:\Documents\Study\blog\web\Blog\axios\拦截器的use顺序.assets\image-20210130185358092.png)

