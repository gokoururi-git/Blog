# Vue-Router的注意点

## hash模式

核心原理：

```js
window.onhashchange = function(e){
  console.log('url由', e.oldURL, '变为', e.newURL);
  console.log('当前hash:', window.location.hash)
}
```
### 缺点

- 使用hash模式就意味着放弃了页面内锚跳转（by the way: http://www.test.com?query=123#hash1#hash2 这样的url的hash是#hash1#hash2）

- url不简洁，比较丑

### 优点

- 兼容性好

## history模式

核心原理：

```js
history.pushState()配合window.popstate事件监听
```

### 缺点

- 兼容性较hash差（使用postmessage这个api的原因）

- 需要后端准备对应url的get请求

### 优点

- 颜值高

