### Koa -- GET POST 使用
---

#### 1. Get请求
在Koa中，获取GET请求数据源头是koa中request对象中的query方法或querystring方法，query返回是格式化好的参数对象，querystring返回的是请求字符串；    
请求对象 ctx.query(or ctx.request.query), 返回如 {a:1，b:2}     
请求字符串 ctx.querystring(or ctx.request.querystring)， 返回如 a=1&b=2;    

```js
const Koa = require('koa');
const app = new Koa();
// const router = require('koa-router')();

app.use(async (ctx,next) => {
  console.log(`url: ${ctx.method} ${ctx.url}...`);
  const url = ctx.request.url;
  const query = ctx.request.query;
  const querystring = ctx.request.querystring;
  ctx.response.body =  {
    url,
    query,
    querystring
  };
  // await next();
})

// router.get('/', async (ctx, next) => {
//   const url = ctx.request.url;
//   const query = ctx.request.query;
//   const querystring = ctx.request.querystring;
//   ctx.response.body =  {
//     url,
//     query,
//     querystring
//   };
// })
// app.use(router.routes());

app.listen(8118);

// 运行程序并访问http://localhost:8118/?page=2&limit=10，我们将得到如下结果
// {"url":"/?page=2&limit=10","query":{"page":"2","limit":"10"},"querystring":"page=2&limit=10"}
// 更多request方法：https://koajs.com/#request
```

#### 2. POST请求（koa-bodyparser）
1. 用post请求处理URL时，我们会遇到一个问题：post请求通常会发送一个表单，或者JSON，它作为request的body发送，但无论是Node.js提供的原始request对象，还是koa提供的request对象，都不提供解析request的body的功能！
2. 需要通过自己解析上下文context中的原生node.js请求对象req，将POST表单数据解析成querystring（例如：a=1&b=2&c=3），再将querystring 解析成JSON格式（例如：{"a":"1", "b":"2", "c":"3"}）;
3. 此时需要使用koa-bodyparser 模块从 POST 请求的数据体里面提取键值对

##### 2.1 安装koa-bodyparser：
```text
安装：npm install koa-bodyparser --save
导入：const bodyParser = require('koa-bodyparser')
注册: app.use(bodyParser());   // koa-bodyparser必须在router之前被注册到app对象上
```
##### 2.2 实现POST请求
```js
// 示例一：
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');

app.use(bodyParser()); // 注册
 
app.use(async (ctx, next) => {
  if(ctx.request.url === '/' && ctx.request.method === 'GET') {
    let html = `
      <h1>koa-bodyparser</h1>
      <form method="POST" action="/">
        Name:<input name="name" /><br/>
        Age:<input name="age" /><br/>
        Email: <input name="email" /><br/>
        <button type="submit">submit</button>
      </form>
    `
    ctx.response.body = html;
  }else if(ctx.request.url === '/' && ctx.request.method === 'POST') {
    ctx.response.body = ctx.request.body;
  }else {
    ctx.response.body = '404'
  }
})

app.listen(8118)
```
##### 2.3 POST请求模块封装
随着URL越来越多,得封装一个模块集中处理，这样，代码一分离，逻辑就显得清楚；    
> |- controllers      
> |-- controller.js  模块处理模块引入   
> |-- post.js  模块处理post请求   
> |-- url.js  模块进行集中处理url   
> |- 04KoaPost.js 运行     


```js
// url.js
// 把一个URL处理函数暴露出来
module.exports = {
  getUlrl: async (ctx, next) => {
    let name = ctx.params.name;
    ctx.response.body = `<h1> Hello ${name}</h1>`
  }
}
```

```js
// post.js
module.exports = {
  'GET /': _koaPost = async (ctx, next) => {
    ctx.response.body = `
      <h1>Login...</h1>
      <form method="POST" action="/">
        Name:<input name="name" /><br/>
        Password:<input name="password" /><br/>
        Email: <input name="email" /><br/>
        <button type="submit">submit</button>
      </form>
    `
  },

  'POST /': _signin = async (ctx, next) => {
    console.log(`ctx.request.body: ${ctx.request.body}`)
    let name = ctx.request.body.name || '';
    let password = ctx.request.body.password || '';
    let email = ctx.request.email || '';
    console.log(`${name} ${password}`)
    if(name === 'koa' && password === '123456') {
      ctx.response.body = `<h1>Welcome ${name}</h1>`;
    }else {
      ctx.request.body = `<h1> Login failed !</h1>`
    }
  }
}
```

```js
// controller.js
const fs = require('fs');

function Mapping(router, mapping) {
  for (var url in mapping) {
    if (url.startsWith('GET ')) {
        var path = url.substring(4);
        router.get(path, mapping[url]);
        console.log(`register URL mapping: GET ${path}`);
    } else if (url.startsWith('POST ')) {
        var path = url.substring(5);
        router.post(path, mapping[url]);
        console.log(`register URL mapping: POST ${path}`);
    } else if (url.startsWith('PUT ')) {
        var path = url.substring(4);
        router.put(path, mapping[url]);
        console.log(`register URL mapping: PUT ${path}`);
    } else if (url.startsWith('DELETE ')) {
        var path = url.substring(7);
        router.del(path, mapping[url]);
        console.log(`register URL mapping: DELETE ${path}`);
    } else {
        console.log(`invalid URL: ${url}`);
    }
  }
}

function Controllers(router, dir) {
  fs.readdirSync('./' + dir).filter((f) => {
    return f.endsWith('.js');
  }).forEach((f) => {
    console.log(`controller: ${f}`);
    let mapping = require('./' + f);
    Mapping(router, mapping);
  })
}

module.exports = {
  _app: (dir) => {
    let _dir = dir || 'controllers';
    let router = require('./node_modules/koa-router')();
    Controllers(router, _dir);
    return router.routes();
  }
}
```

```js
// 04KoaPost.js
const fs = require('fs');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controllers = require('./controllers/controller');

const app = new Koa();
app.use(bodyParser()); // 注册

app.use(async (ctx, next) => {
  console.log(`${ctx.request.method} ${ctx.request.url}...`)
  await next();
})

app.use(controllers._app());

// 端口
app.listen(8008)
```