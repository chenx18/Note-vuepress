### koa 使用 cookie/session
---
#### 1.1 COOKIE 简介
+ cookie 是存储于访问者的计算机中的变量。可以让我们用同一个浏览器访问同一个域名的时候共享数据。   

+ HTTP是无状态协议。简单地说，当你浏览了一个页面，然后转到同一个网站的另一个页面，服务器无法认识到这是同一个浏览器在访问同一个网站。每一次的访问，都是没有任何关系的。    

+ Cookie是一个简单到爆的想法：当访问一个页面的时候，服务器在下行HTTP报文中，命令浏览器存储一个字符串; 浏览器再访问同一个域的时候，将把这个字符串携带到上行HTTP请求中。第一次访问一个服务器，不可能携带cookie。 必须是服务器得到这次请求，在下行响应报头中，携带cookie信息，此后每一次浏览器往这个服务器发出的请求，都会携带这个cookie。  
+ koa2 中操作的cookies是使用了npm的cookies模块，源码在https://github.com/pillarjs/cookies，所以在读写cookie的使用参数与该模块的使用一致。   

#### 1.2 Koa2中 Cookie的使用 
###### 使用： 
```js
1. Koa中设置Cookie的值
  ctx.cookies.set(name, value, [options])
  options:[
    maxAge              一个数字表示从 Date.now() 得到的毫秒数
    expires cookie      过期的 Date
    path cookie         路径, 默认是'/'
    domain cookie       域名
    secure             安全 cookie   默认false，设置成true表示只有 https可以访问
    httpOnly           是否只是服务器可访问 cookie, 默认是 true
    overwrite          一个布尔值，表示是否覆盖以前设置的同名的 cookie (默认是 false). 如果是 true, 在同一个请求中设置相同名称的所有 Cookie（不管路径或域）是否在设置此Cookie 时从 Set-Cookie 标头中过滤掉。
  ]

2. Koa中获取Cookie的值
  ctx.cookies.get('name');
```
###### cookie示例： 
```js
// 示例：
// koa提供了从上下文直接读取、写入cookie的方法
//  ctx.cookies.get(name, [options]) 读取上下文请求中的cookie
//  ctx.cookies.set(name, value, [options]) 在上下文中写入cookie

const Koa = require('koa');
const app = new Koa();

app.use(async (ctx,next) => {
  if(ctx.request.url === '/index') {
    ctx.cookies.set(
      'cookie01', 
      'Hello word !',
      {
        domain: 'localhost',      // 写cookie所在的域名
        path: '/',                // 写 cookie 所在的路径(此处设置所有路径)
        maxAge: 10 * 60 * 1000,   // cookie 有效时长
        expires: new Date('2019-04-20'),    // cookie 失效时间
        httpOnly: false,    // 是否只用于http请求中获取
        overwrite: false    // 是否重写
      }
    );
    ctx.response.body = 'set cookes ok!';
  }else {
    ctx.response.body = 'Hello cookies';
  }
  await next();
  
})

app.use(async (ctx) => {
  if(ctx.url === '/get') {
    ctx.response.body = ctx.cookies.get('cookie01');
  }
  
})

app.listen(3300)

```

#### 2.1 koa-session 简介
- **session：** session是另一种记录客户状态的机制，不同的是Cookie保存在客户端浏览器中，而session保存在服务器上。    
- **Session的工作流程：** 当浏览器访问服务器并发送第一次请求时，服务器端会创建一个session对象，生成一个类似于key,value的键值对， 然后将key(cookie)返回到浏览器(客户)端，浏览器下次再访问时，携带key(cookie)，找到对应的session(value)。 客户的信息都保存在session中

#### 1.2 Koa2中 koa-session的使用 
###### 安装：
```text
1. 安装：
  npm install koa-session --save

2. 引入express-session：
  const session = require('koa-session');

3. 设置官方文档提供的中间件：
  app.keys = ['some secret hurr']; // cookie的签名
  const CONFIG = {
    key: 'koa:sess',   //cookie key (default is koa:sess)
    maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
    overwrite: true,  //是否可以overwrite    (默认default true)
    httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
    signed: true,   //签名默认true
    rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
    renew: false,  //(boolean) renew session when session is nearly expired,
  };
  app.use(session(CONFIG, app));

4. 使用：
  设置值 ctx.session.username = "张三";
  获取值 ctx.session.username
```
###### koa-session示例：
```js
  const Koa = require('koa');
  const session = require('koa-session');
  const app = new Koa();

  //配置session的中间件
  app.keys = ['some secret hurr']; // cookie的签名
  const CONFIG = {
    key: 'koa:sess',   //cookie key (default is koa:sess)
    maxAge: 100000,  // cookie的过期时间 maxAge in ms (default is 1 days)
    overwrite: true,  //是否可以overwrite    (默认default true)
    httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
    signed: true,   //签名默认true
    rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
    renew: false,  //(boolean) renew session when session is nearly expired,
  };
  app.use(session(CONFIG, app))

  app.use(async (ctx, next) => {
    if(ctx.request.url === '/index') {
      ctx.session.userName= 'zhangsan';
      ctx.session.userPassword = '123456';
      ctx.response.body = 'set session success !'
    }else {
      ctx.response.body = 'Hello session !'
    }
    await next()
  });

  app.use(async (ctx,next) => {
    if(ctx.request.url === '/getSession') {
      ctx.response.body = `Name: ${ctx.session.userName}  Paw: ${ctx.session.userPassword}`;
    }
  })

  app.listen(3500);

``` 

#### 3. Koa中Cookie和Session区别
  1. cookie数据存放在客户的浏览器上，session数据放在服务器上。    
  2. cookie不是很安全，别人可以分析存放在本地的COOKIE并进行COOKIE欺骗考虑到安全应当使用session。        
  3. session会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能考虑到减轻服务器性能方面，应当使用COOKIE。    
  4. 单个cookie保存的数据不能超过4K，很多浏览器都限制一个站点最多保存20个cookie。  

