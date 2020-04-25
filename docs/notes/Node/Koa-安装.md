### koa 2.x

koa 是一个新的 web 框架，由 Express 幕后的原班人马打造，致力于成为 web 应用和 API 开发领域中的更小、更富有表现力、更健壮的基石；    
通过利用 async 函数，koa 帮你丢弃会调函数，并有了的增强错误处理。   
Koa 并没有捆绑任何中间，而是提供一套优雅的方法，帮助你快速而愉快地编写服务端应用程序    
 <a href="https://koa.bootcss.com/" target="_blank">Koa 官网</a>  
 <a href="https://chenshenhai.github.io/koa2-note/" target="_blank">Koa进阶学习笔记</a>  
 <a href="https://www.itying.com/koa/article-index-id-59.html" target="_blank">Koa中文网</a>  
 
 <br>

---
#### Koa 安装载入
1. 安装
```md
npm i koa --save
```
2. 载入
```js
// 1. 引入并实例
const Koa = require('koa');
const app = new Koa();

// 2. 响应输出
app.use(async (ctx, next) => {
    await next();
    // 设置response的Content-Type,
    ctx.response.type = 'text/html';
    // 设置response的内容, 
    ctx.response.body = '<h1>Hello, koa2!</h1>';
});
/** 注意ctx对象有一些简写的方法，例如ctx.url相当于ctx.request.url，ctx.type相当于ctx.response.type。 */

// 3. 端口设置
app.listen(9999);

```
3. 参数介绍
> **ctx**: 是由koa传入封装了request 和 response 的变量，可通过它访问request 和 response ；  
> **next**: 是koa传入的将要处理的下一个异步函数;     
> **await next()**: 在响应输出中先用了 await next(); 处理下一个异步函数，然后去设置Content-Type和内容； 


