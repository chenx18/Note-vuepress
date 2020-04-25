### koa-generator 快速搭建Node服务器 AND 手动搭建Node服务器

#### 一、koa-generator脚手架

##### 1. 使用koa-generator 特点：

- 集成一些 exporess 风格的中间件，不需要手动去写
- nodemon + runkoa, 支持ES6/ES7语法，代码有更改，服务将自动重启；
- https://www.xgllseo.com/?p=5633

##### 2. 安装
```js
  // 全局安装这个就可以使用koa命令了
    npm install -g koa-generator 
```

##### 3. 使用

```js
  // name 项目名称
  // 1. 生成 koa项目
    koa2 name
```
##### 4. Koa的参数
```md
  -h, --help 帮助
  -V, --version 版本号
  -e, --ejs 添加ejs模板引擎支持(默认是jade) (例：koa2 -e name 创建一个项目带ejs模板)
  --hbs 添加hbs模板引擎支持(默认是hbs)
  -H, --hogan 添加hogan.js支持
  -c, --css <engine> 添加css样式 支持 less sass styus css(默认是css)
  --git 添加 .gitignore
  -f, --force force on non-empty directory
```

#### 5. 目录机构
```js
  +-- bin
  |   +-- www               // 项目启动必备文件,配置端口等服务信息
  +-- node_modules          // 项目依赖，安装的所有模块都会在这个文件夹下
  +-- public                // 存放静态文件，如样式、图片等
  |   +-- images            // 图片
  |   +-- javascript        // js文件
  |   +-- stylesheets       // 样式文件
  +-- routers               // 存放路由文件，如果前后端分离的话只用来书写api接口使用
  |   +-- index.js
  |   +-- user.js
  +-- views                 // 存放存放模板文件，就是前端页面，如果后台只是提供api的话，这个就是备用
  |   +-- error.pug
  |   +-- index.pug
  |   +-- layout.pug
  +-- app.js                // 主入口文件
  +-- package.json          // 存储项目名、描述、作者、依赖等等信息
  +-- package-lock.json     // 存储项目依赖的版本信息，确保项目内的每个人安装的版本一致
```

#### 二、手动搭建 Node 服务

###### 1. package.json
```js
  // 手动创建一个项目目录，快速生成一个 package.json 文件；
  npm init -y
```

###### 2. 安装 koa
```js
  // 不指定版本默认当前最新版本
  npm install koa -save
```
###### 3. 创建入口文件（app.js）
```js
  // app.js
  const Koa = require(``'koa'``);
  const app = new Koa();
  app.use(async ctx => {
    ctx.body ='hellow';
  });
  app.listen(3000);
```