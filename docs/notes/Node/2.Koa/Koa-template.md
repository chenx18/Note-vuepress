### koa art-template高性能模板引擎

<a href="#1">一、前言</a>  
<a href="#2">二、在Koa中使用art-template模板引擎</a> （特性、安装art-template 和 koa-art-template、 配置Koa2中间件）       
<a href="#3">三、在Koa中使用ejs模板引擎</a>（EJS特性、安装、配置、使用 koa-views 和ejs、安使用 koa-views 和ejs 示例）   

---

<h4 id="1">一、前言</h4>

+ 适用于 koa 的模板引擎选择非常多，比如 jade、ejs、nunjucks、art-template等。   
+ art-template 是一个简约、超快的模板引擎。   
+ 它采用作用域预声明的技术来优化模板渲染速度，从而获得接近 JavaScript 极限的运行性能，并且同时支持 NodeJS 和浏览器。

<!-- #### 二、在Koa中使用art-template模板引擎  -->
<h4 id="2">二、在Koa中使用art-template模板引擎</h4>   

> art-template官网：<a href="https://aui.github.io/art-template/" target="_blank">https://aui.github.io/art-template/</a>

##### 1. 特性
> 1. 拥有接近 JavaScript 渲染极限的的性能
> 2. 调试友好：语法、运行时错误日志精确到模板所在行；支持在模板文件上打断点（Webpack Loader）
> 3. 支持 Express、Koa、Webpack
> 4. 支持模板继承与子模板
> 5. 浏览器版本仅 6KB 大小  

##### 2. 安装art-template 和 koa-art-template
```js
  npm install --save art-template
  npm install --save koa-art-template
```
##### 3. 配置Koa2中间件：
```js
  // art.js
  const Koa = require('koa');
  const path = require('path');
  const router = require('koa-router')();
  const render = require('koa-art-template');
  const app = new Koa();

  // 配置 koa-art-template模板引擎
  // 核心方法之一：将模板源代码编译成函数并立刻执行 template.render(source, data, options);
  render(app, {
    root: path.join(__dirname, 'views'),   // 视图的位置
    extname: '.html',  // 后缀名
    debug: process.env.NODE_ENV !== 'production' //是否开启调试模式
  });

  router.get('/', async (ctx, next) => {
    let data ={
      name: 'zhang',
      age: 18,
      items: ['吃鸡', '健身', '骑车']
    };

    await ctx.render('art', {data})  // 渲染 art.html
  })

  app.use(router.routes()) // 启动路由

  app.listen(3006);
```
```html
  <!-- art.html -->
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
    <title>Document</title>
  </head>
  <body>
    <ul>
      <li>Name: {{data.name}}</li>
      <li>Age: {{data.age}}</li>
      <li>Like: 
        {{each data.item}}
        <span>{{$index+1}}: {{$value}}</span>
        {{/each}}
      </li>
    </ul>
    <!-- 引入子模板 -->
    {{include'./footer.html}}
  </body>
  </html>
```

<h4 id="3">三、在Koa中使用ejs模板引擎</h4>

> EJS官网：<a href="https://ejs.bootcss.com/" target="_blank">https://ejs.bootcss.com/</a>    

##### 1. EJS特性：
+ EJS 是一套简单的模板语言，帮你利用普通的 JavaScript 代码生成 HTML 页面。
+ EJS 没有如何组织内容的教条；也没有再造一套迭代和控制流语法；有的只是普通的 JavaScript 代码而已。

##### 2. 安装、配置、使用 koa-views 和ejs
```js
  1. 安装
    安装koa-views: npm install --save koa-views / cnpm install --save koa-views
    安装ejs: npm install ejs --save  /  cnpm install ejs --save
    
  2. 引入koa-views配置中间件
    const views = require('koa-views');

  3. 配置模板引擎中间件  --第三方中间件
    //app.use(views('views', { map: {html: 'ejs' }}));   //注意这样配置的话 模板的后缀名是.html
    app.use(views('views', { map: {html: 'ejs' }}));

  4. Koa中使用ejs：
    router.get('/',async (ctx)=>{
        let title = 'hello koa2'
        await ctx.render(index',{
          title
        })  
    }) 
```
###### 3. 安使用 koa-views 和ejs 示例：
```js
  // ejs.js
  const Koa = require('koa');
  const router = require('koa-router')();
  const views = require('koa-views');
  const app=new Koa();

  //配置模板引擎中间件  --第三方中间件
  app.use(views('views', {
    extension: 'ejs'     // 应用ejs模板引擎
  }))

  // 公共数据，每个路由里面都要该数据
  app.use(async (ctx,next) => {
    ctx.state.userName = '张';
    await next(); // 继续向下匹配路由
  })

  router.get('/', async (ctx) => {
    let title = '你好ejs：';
    let list = ['吃鸡','健身','骑车'];
    let content = "<h2>这是一个h2</h2>";
    let num = 10;
    await ctx.render('index',{title,list,content,num})  // 渲染
  });

  app.use(router.routes());  //启动路由

  // 作用:这是官方文档的推荐用法,我们可以看到 router.allowedMethords() 用在 router.routes() 之后,
  // 所有,在当所有的路由中间件最后使用.此时根据 ctx.status 设置 response 响应头
  app.use(router.allowedMethods());

  app.listen(3000);
```

```html
  <!-- index.ejs -->
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
    </head>
    <body>
      <h1>普通模版</h1>
      <h2><%=title%> <%=userName%></h2>
      <h1>ejs循环输出模版</h1>
      <ul>
        <%for(var i = 0;i<list.length;i++){%>
          <li><%= list[i] %></li>
        <%}%>
      </ul>
      <h2>原文输出标签</h2>
      <%- content %>
      <h2>条件判断</h2>
      <% if(num > 20){ %>
        大于20
      <% }else{ %>
        小于20
      <% } %>
    </body>
  </html>
```