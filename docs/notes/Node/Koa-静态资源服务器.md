### koa2实现静态资源服务器
---

#### 1. 前言
一个http请求访问web服务静态资源，一般响应结果有三种情况：
 + 访问文本（js css png jpg gif）
 + 访问静态目录
 + 找不到资源，抛出404错误

 #### 2. 原生koa2实现静态资源服务器
 ```text
 代码目录
  ├── static # 静态资源目录
  │   ├── css/
  │   ├── image/
  │   ├── js/
  │   └── index.html
  ├── controllers # 工具代码
  │   ├── content.js # 读取请求内容
  │   ├── dir.js # 读取目录内容
  │   ├── file.js # 读取文件内容
  │   └── walk.js # 遍历目录内容
  ├── index01.js # 启动入口文件（原生）
  ├── index02.js # 启动入口文件（中间件）
  └── mime.json # 文件类型列表
 ```
 
```js
  // index01.js # 启动入口文件（原生）
  const Koa = require('koa');
  const path = require('path');
  const url = require('url');
  const fs = require('fs');
  const content = require('./controllers/content');

  const app = new Koa();

  // 静态资源目录对于相对入口文件index.js的路径
  const staticPath = './static';

  // 解析资源类型
  function parseMime(extname) {
    if(extname) {
      fs.readFile('./mime.json', (err, data) => {
        if(err) {
          console.log('未找到 mime 文件')
        }else {
          let Mimes = JSON.parse(data.toString());
          let result = Mimes[extname] || 'text/html';  // 使用传入的参数找到json中对应的值，没找到就默认 text/html
          return result;
        }
      })
    }else {
      return 'text/html';
    }
  }

  app.use(async (ctx,next) => {
    console.log(`${ctx.url}, ${ctx.method}, ${__dirname} ...`);

    // 静态资源目录在本地的绝对路径
    let fullStaticPath = path.join(__dirname, staticPath);
    console.log(`fullStaticPath: ${fullStaticPath}`);

    // 获取静态资源内容，有可能是文件内容、目录、404
    let _content = await content(ctx, fullStaticPath);
    console.log(`_content: ${_content}`)

    // 解析请求内容类型
    let pathName = url.parse(ctx.url).pathname;       // 获取url name；
    let extname = path.extname(pathName);             // 获取当前url文件后缀名，以便设置文件类型
    let _mime = parseMime(extname);
    console.log(`extname: ${extname}`)
    
    // 输出静态资源内容
    if( extname === '.jpg') {
      ctx.response.writeHead(200, {"Content-Type" : ""+ _mime +";charset='utf-8'"});
      ctx.response.write(_content, 'binary');
      ctx.response.end()
    }else {
      ctx.type = _mime;
      ctx.body = _content;
      console.log(ctx.body)
    }
  })

  app.listen(3200)

```

```js
  // content.js # 读取请求内容
  const path = require('path');
  const fs = require('fs');
  const dir = require('./dir')
  const file = require('./file')

  // 获取静态资源内容
  async function content(ctx, fullStaticPath) {
    let reqPath = path.join(fullStaticPath, ctx.url);  // 资源的绝对路径
    let exist = fs.existsSync(reqPath);  // 以同步的方法检测目录是否存在
    console.log(`reqPath: ${reqPath}`);  

    let content = '';
    if(!exist) {
      content = '404'
    }else {
      let stat = fs.statSync(reqPath); // 以同步的方法获取文件信息
      console.log(`isDirectory: ${stat.isDirectory()}`);  
      if(stat.isDirectory()) { // 如果是目录返回 true，否则返回 false
        content = dir(ctx.url, reqPath);
      }else {
        content = file(ctx.url, reqPath);
      }
    }
    return content;
  };
  module.exports = content;
 
 ```

 ```js
  // dir.js # 读取目录内容
  const url = require('url');
  const fs = require('fs');
  const path = require('path');
  const walk = require('./walk');  // 遍历读取当前目录下的文件、子目录
  
  function dir (url, reqPath) {
    let contentList = walk(reqPath);
    let html = `<ul>`
    for(let [index, item] of contentList.entries()) {
      html = `${html}<li><a href="${url === '/'?'':url}/${item}">${item}</a><li>`
    }
    html = `${html}</ul>`
    return html
  }

  module.exports = dir
```

```js
  // file.js # 读取文件内容
  const fs = require('fs');
  function file(filePath) {
    let content = fs.readFileSync('./static'+filePath)
    return content;
  }
  module.exports = file;
 
```

```js
  // walk.js # 遍历目录内容
  const fs = require('fs');
  // 解析资源类型
  function parseMime(itemMime) {
    if(itemMime) {
      fs.readFile('./mime.json', (err, data) => {
        if(err) {
          console.log('未找到 mime 文件')
        }else {
          let Mimes = JSON.parse(data.toString());
          let result = Mimes[itemMime] || 'text/html';  // 使用传入的参数找到json中对应的值，没找到就默认 text/html
          return result;
        }
      })
    }else {
      return 'text/html';
    }
  }

  function walk(reqPath) {
    let files = fs.readdirSync(reqPath);

    let dirList = [];
    let fileList = [];
    for(let i=0; i<files.length; i++) {
      let item = files[i];
      let itemArr = item.split("\.");
      let itemMime = (itemArr.length > 1) ? itemArr[itemArr.length - 1] : 'undefined';
      console.log(`itemMime1: ${itemMime}`)
      console.log(`itemMime2: ${parseMime[itemMime]}`)
      if(typeof parseMime[itemMime] === 'undefined') {
        dirList.push(files[i]);
      }else {
        fileList.push(files[i]);
      }
    }
    let result = dirList.concat(fileList);
    return result
  }

  module.exports = walk;
  
```

#### 3. koa-static中间件实现静态资源服务器
+ 上面代码封装好 内容处理、文件读取、目录读取、遍历目录 模块去实现静态资源服务器，过程繁琐，下面将用 koa-static 中间件实现静态资源服务器；
##### 3.1 安装
```text
  npm i --save koa-static
```
##### 3.2 实现
```js
const Koa = require('koa')
const path = require('path')
const static = require('koa-static')

const app = new Koa()

const staticPath = './static';      // 静态资源目录对于相对入口文件index.js的路径

app.use(static(path.join( __dirname,  staticPath)));    // 使用

app.use( async ( ctx ) => {
  ctx.body = 'hello world'
})

app.listen(3100)

```
> 会发现 koa-static 用简单的代码就实现了这个需求。