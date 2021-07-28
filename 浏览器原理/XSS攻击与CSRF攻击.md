# XSS攻击与CSRF攻击

## XSS攻击

XSS攻击一共有三种

- 反射型：在网络请求中直接拼接恶意数据，用户再次请求时下载了恶意脚本，发生XSS攻击

- 存储型：使恶意脚本存储到远端服务器，用户再次请求时下载了恶意脚本，从而发生XSS攻击

- 文档型：恶意脚本直接对当前页面进行修改，包括cookie的泄漏等

### 防范措施

对输入进行文本转换, 比如转换为`&gt;`等

CSP：内容安全策略，总体来说就是我们可以让服务器决定浏览器可以获取哪些资源，其中就包括了JS的资源，我们可以设置`script-src:unsafe-inline`阻止内联js代码执行

## CSRF攻击

在不同网站可以发送其他域的请求并携带目标域的cookie，这样就会使cookie泄漏从而使恶意服务器发动攻击。

### 防范措施

- 开启cookie的SameSite属性

  - 限制SameSite为Strict的话会发生从某个页面跳转到其他页面时，带不上目标页面的cookie进而产生的现象就是打开的页面是无登录状态

  - SameSite为lax时，是在Strict基础上对跳转链接的get请求进行了宽容，它有3种情况：

    | 请求类型  |                 示例                 |    正常情况 | Lax         |
    | :-------- | :----------------------------------: | ----------: | :---------- |
    | 链接      |         `<a href="..."></a>`         | 发送 Cookie | 发送 Cookie |
    | 预加载    | `<link rel="prerender" href="..."/>` | 发送 Cookie | 发送 Cookie |
    | GET 表单  |  `<form method="GET" action="...">`  | 发送 Cookie | 发送 Cookie |
    | POST 表单 | `<form method="POST" action="...">`  | 发送 Cookie | 不发送      |
    | iframe    |    `<iframe src="..."></iframe>`     | 发送 Cookie | 不发送      |
    | AJAX      |            `$.get("...")`            | 发送 Cookie | 不发送      |
    | Image     |          `<img src="...">`           | 发送 Cookie | 不发送      |

- scrftoken，在页面中加入scrftoken，在发送请求的时候带上

- refer头检测，JS被设置不允许修改refer头

- 敏感api使用验证码二次验证

