### koa-multer图片文件上传
<a href="#1">一、前言</a>   
<a href="#2">二、koa-multer的安装、配置</a>   
<a href="#3">三、koa-multer上传单个</a>   
<a href="#4">三、koa-multer上传多个</a>

---

<h4 id="1">一、前言</h4>

+ koa-multer是一个 node.js 中间件，用于处理 multipart/form-data 类型的表单数据，它主要用于上传文件。它是写在 busboy 之上非常高效   
+ Multer 不会处理任何非 multipart/form-data 类型的表单数据，意思就是我们要上传图片必须在form表单上面加  multipart/form-data    


<h4 id="3">二、koa-multer的安装、配置</h4>

###### 安装、引入：
```js
  1. 安装：
    npm i koa-multer -S

  2. 引入：
    const multer = require('koa-multer'); 
```

###### 配置：
```js
  1. 配置上传目录和文件名（multer.diskStorage）：
    // 使用 multer.diskStorage({}) 方法，实现自定义上传目录和文件名
    let storage = multer.diskStorage({
      // 文件保存路径
      destination: (req, file, cb) => {
        cb(null, 'public/') //注意路径必须存在
      },
      // 文件名称设置
      filename: (req, file, cb) => {
        let fileFormat = (file.originalname).split(".");
        // cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]); // 此处修改了文件名称
        cb(null, file.originalname); // 此处保留原有的文件名称
      }
    });

  2. 文件过滤
    // (可设置也可不设置)
    let fileFilter = (ctx, file, cb) => {
      console.log(file.originalname.split('.').splice(-1))
      // 过滤上传的后缀为txt的文件
      if (file.originalname.split('.').splice(-1) == 'txt'){
        cb(null, false); 
      }else {
        cb(null, true); 
      }
    };

  3. 加载配置
    const upload = multer({storage: storage, fileFilter: fileFilter});

```

<h4 id="3">三、koa-multer上传</h4>

```html
<!-- index.ejs -->
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
    </head>
    <body>
      <h1>Hello <%= title %> !</h1>
      <form action="/upload" method="POST" enctype="multipart/form-data">
        <p><input type="file" name="file"></p> 
        <p><input type="submit" value="ok"></p>
      </form>
    </body>
  </html>

```


```js
  // main01.js
  // 安装：
  // koa koa-views koa-multer ejs koa-router 
  // npm i koa koa-views koa-multer ejs -S
  // npm i koa-router -S

  const Koa = require('koa'); // 引入 koa
  const path = require('path'); // 引入 path
  const router = require('koa-router')(); // 引入 koa-router
  const views = require('koa-views'); // 引入 koa-views
  const multer = require('koa-multer'); // 引入koa-multer 
  // 注册koa
  const app = new Koa();  

  // 加载模板引擎
  app.use(views(path.join(__dirname,'/views'),{extension: 'ejs'}));

  // 使用 multer.diskStorage({}) 方法，实现自定义上传目录和文件名
  let storage = multer.diskStorage({
    // 文件保存路径
    destination: (req, file, cb) => {
      cb(null, 'public/') //注意路径必须存在
    },
    // 文件名称设置
    filename: (req, file, cb) => {
      let fileFormat = (file.originalname).split(".");
      // cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]); // 此处修改了文件名称
      cb(null, file.originalname); // 此处保留原有的文件名称
    }
  });

  // 文件过滤配置
  let fileFilter = (ctx, file, cb) => {
    console.log(file.originalname.split('.').splice(-1))
    // 过滤上传的后缀为txt的文件
    if (file.originalname.split('.').splice(-1) == 'txt'){
      cb(null, false); 
    }else {
      cb(null, true); 
    }
    
  };

  // 加载配置
  const upload = multer({storage: storage, fileFilter: fileFilter});

  router.get('/', async(ctx,next) => {
    let title = 'Koa multer';
    await ctx.render('index', {title}); // 渲染页面
  });

  router.post('/upload', upload.single('file'),(ctx,next) => {
    console.log(ctx.req.file)
    if(ctx.req.file) {
      ctx.body = {
        filename: ctx.req.file
      }
    }else {
      ctx.response.body = 'upload error !'
    }
  })

  // 启动路由
  app.use(router.routes());
  app.use(router.allowedMethods())

  // 设置端口
  app.listen(9102)

```

<h4 id="4">四、koa-multer上传多个文件图片</h4>

```html
  <!-- index02.ejs -->
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
    </head>
    <body>
      <h1>Hello <%= title %> !</h1>
      <form action="/upload" method="POST" enctype="multipart/form-data">
        <p><input type="file" name="pic"></p> 
        <p><input type="file" name="file1"></p> 
        <p><input type="file" name="file2"></p> 
        <p><input type="submit" value="上传多个文件"></p>
      </form>
    </body>
  </html>
```

```js
  // main02.js
  const Koa = require('koa'); // 引入 koa
  const path = require('path'); // 引入 path
  const router = require('koa-router')(); // 引入 koa-router
  const views = require('koa-views'); // 引入 koa-views
  const multer = require('koa-multer'); // 引入koa-multer 
  // 注册koa
  const app = new Koa();  

  // 加载模板引擎
  app.use(views(path.join(__dirname,'/views'),{extension: 'ejs'}));

  // 文件上传配置
  let storage = multer.diskStorage({
    // 文件保存路径
    destination: (req, file, cb) => {
      cb(null, 'public/') //注意路径必须存在
    },
    // 文件名称设置
    filename: (req, file, cb) => {
      let fileFormat = (file.originalname).split(".");
      cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]); // 此处修改了文件名称
    }
  });

  // 文件过滤配置
  let fileFilter = (ctx, file, cb) => {
    // 过滤上传的后缀为txt的文件
    if (file.originalname.split('.').splice(-1) == 'txt'){
      cb(null, false); 
    }else {
      cb(null, true); 
    }
  };

  // 加载配置
  const upload = multer({storage: storage, fileFilter: fileFilter});
  let uploadData = upload.fields([{name: 'pic', maxCount:1}, {name: 'file1', maxCount: 1}, {name: 'file2', maxCount: 1}]); // 设置上传文件name

  router.get('/', async(ctx,next) => {
    let title = 'Koa multer';
    await ctx.render('index02', {title}); // 渲染页面
  });

  router.post('/upload', uploadData,(ctx,next) => {
    if(ctx.req.files) {
      ctx.body = {
        filename: ctx.req.files
      }
    }else {
      ctx.response.body = 'upload error !'
    }
  })

  // 启动路由
  app.use(router.routes());
  app.use(router.allowedMethods())

  // 设置端口
  app.listen(2019)

```

> 注：单个上传和多个上传都必须先建好存储的文件，其中区别在 单个是 **upload.single('file')**, 多个是 **upload.fields()**