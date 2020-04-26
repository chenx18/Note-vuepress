### koa-router中间件
路由（Routing）是由一个 URI（或者叫路径）和一个特定的 HTTP 方法（GET、POST 等）组成的，涉及到应用如何响应客户端对某个网站节点的访问。   
通俗的讲：路由就是根据不同的URL地址，加载不同的页面实现不同的功能。   
Koa中的路由和Express有所不同，在Express中直接引入Express就可以配置路由，但是在Koa中我们需要安装对应的koa-router路由模块来实现。
<br>

---
#### 1. koa-router安装使用
```js
// 安装：（安装完成，可以在package-lock.json 看到安装的 koa-router 信息；）
npm install koa-router --save

// 导入
const router = require('koa-router')();
// 注：导入koa-router的语句最后的()是函数调用：
// 相当于：
// const fn_router = require('koa-router');
// const router = fn_router();
```

#### 2. 不使用 koa-router 处理：
```js
// 目的：应该对不同的URL调用不同的处理函数，这样才能返回不同的结果:
const Koa = require('koa');
const app = new Koa;

app.use(async (ctx, next) => {
  if(ctx.path === '/') {
    ctx.body = '<h2>Hello Word !</h2>';
  } else {
    await next();
  }
});

app.use(async (ctx, next) => {
  if(ctx.path === '/index') {
    ctx.body = '<h2>Index page !</h2>'
  }else {
    await next();
  }
})

app.use(async (ctx, next) => {
  if(ctx.path === '/login') {
    ctx.body = '<h2>login page !</h2>'
  }else {
    await next();
  }
})

app.listen(8899)
// 此处虽然可以运行，但似乎有点麻烦;
```

#### 3. 使用 koa-router 处理：
```js
// 目的：应该对不同的URL调用不同的处理函数，这样才能返回不同的结果:
// 1. 引入koa
const Koa = require('koa');

// 2. 引入 koa-router,
const router = require('koa-router')();

const app = new Koa();

// 3. 响应
app.use(async (ctx,next) => {
  console.log(`url: ${ctx.method} ${ctx.url}...`);
  await next();
});

// http://localhost:8866
router.get('/', async (ctx,next) => {
  ctx.response.body = `<h2> Hello Word !</h2>`
});

// http://localhost:8866/index
router.get('/index', async (ctx,next) => {
  ctx.response.body = `<h2>Index page !</h2>`
});

// http://localhost:8866/login/zhangsan
// 在请求路径中使用带变量的/login/:name，变量可以通过ctx.params.name访问。
router.get('/login/:name', async (ctx,next) => {
  let name = ctx.params.name;
  ctx.response.body = `<h2> name: ${name}</h2>`
});

app.use(router.routes())
// 4. 端口
app.listen(8866);
```
> 通过上面两段代码对比，会发现koa-router 使用起来更方便，代码也更清晰简单；