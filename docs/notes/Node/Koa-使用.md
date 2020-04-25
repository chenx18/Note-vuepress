### koa 入门

#### 1. koa Hello word
```js
// // 1. 引入并实例
const Koa = require('koa');
const app = new Koa();

// 响应输出
app.use(async (ctx, next) => {
  await next();
  ctx.type = 'text/html';
  ctx.body = '<h1>Hello, koa2!</h1>';;
})
/** 注意ctx对象有一些简写的方法，例如ctx.url相当于ctx.request.url，ctx.type相当于ctx.response.type。 */

// 端口设置
app.listen(9999);

/** 参数介绍 */
// ctx: 是由koa传入封装了request 和 response 的变量，可通过它访问request 和 response ；
// next: 是koa传入的将要处理的下一个异步函数
// await next(): 在响应输出中先用了 await next(); 处理下一个异步函数，然后去设置Content-Type和内容；
```
#### 2. koa middleware
> **为什么要调用 await next():**   
>   koa把很多async 函数组成一个处理链，每个 async 函数都可以做一些自己的事情，然后用 await next() 来调用一个 async 函数。我们把每个async函数称为middleware，这些middleware可以组合起来，完成很多有用的功能。

```js
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx,next) => {
  console.log(`url：${ctx.request.method} ${ctx.request.url}`); // 打印url
  await next(); // 将会调用下一个async, 不写的话程序以下async都不会执行；
})

app.use(async (ctx, next) => {
  const date = new Date().getTime(); // 当前时间
  console.log(`当前时间： ${date}`);
  await next();
  const ms = new Date().getTime() - date;
  console.log(`耗费时间: ${ms}`);
});

app.use(async (ctx, next) => {
  await next();
  ctx.type = 'text/html';
  ctx.body = '<h1>Hello, koa2!</h1>';
  console.log('输出数据！')
})

app.listen(9999);

// 输出结果如下：
// 1. url：: GET /favicon.ico
// 2. 当前时间： 1555554407666
// 3. 输出数据！
// 4. 耗费时间: 1

```
> <font color="red">注： 假如我们不使用 await next(); 那结果就只会执行第一个 app.use ， 其它 app.use 都不会执行；</font>