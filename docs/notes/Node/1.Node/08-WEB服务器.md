### WEB服务器 - 静态文件托管
---
#### 1. Node模块
> 需要使用 fs http paht url模块；
#### 2. 实例目录：
```html
示例目录结构：
  |- model
    |-- router.js      // 封装的模块
  |- static            // 静态html文件
  |- services.js       // 实现web服务器
  |- mime.json         // 文件类型数据
```
#### 3. router.js
>1. 封装该模块需要引入 Nodejs的 fs paht url;
>2. 首页定义一个获取文件类型的方法（getMime）, 其中extname是我们需要去json中找的文件类型，callback 是一个回调函数，返回该方法找到的值，使用回调函数则是解决异步，使其变成同步；
>3. 定义模块（name: static）使用暴露出去，能在其它文件读取到本处的方法，其中设置了三个参数，就是等会创建的web服务的req和res，staticpath参数则是html静态资源的根目录；
```js
// 1. 引入需要使用的Nodejs模块；
const fs = require('fs');
const path = require('path');
const url = require('url');

// 2. 定义一个获取文件类型的方法
function getMime(extname, callback) {
  fs.readFile('./mime.json', (err,data) => {
    if(err) {
      console.log('未找到mime.json')  // 错误提示
    }else {
      let Mimes = JSON.parse(data.toString());
      let result = Mimes[extname] || 'text/html';  // 使用传入的参数找到json中对应的值，没找到就默认 text/html
      callback(result);           // 使用回调解决异步
    }
  })
};

// 3. 定义模块
module.exports = {
  static: (req,res,staticpath) => {
    let pathName = url.parse(req.url).pathname;       // 获取url name；
    console.log(pathName);
    let extname = path.extname(pathName);             // 获取当前url文件后缀名，以便设置文件类型
    if(pathName === '/') {
      pathName = '/index.html';         // 默认跳转index页面
    };
    if(pathName !== '/favicon.ico') {
      fs.readFile(staticpath + pathName ,(err,data) => {
        // 没有页面时，默认使用 404 页面
        if(err) {
          fs.readFile(staticpath + '/404.hmtl',(err, _data)=> {
            if(err) {
              console.log(err);
            }else {
              res.writeHead(200, {"Content-Type": "text/html;charset='utf-8'"})
              res.write(_data);
              res.end();
            }
          })
        } else {
          // 有对应页面时，则调用封装的获取类型的方法；
          getMime(extname,(mime) => {    
            res.writeHead(200, {"Content-Type":"" + mime + ";charset='utf-8'"});
            res.write(data);
            res.end();
          })
        }
      })
    }
  }
}
```
#### 4. services.js
> 1. 在这个文件中调用刚才写好的模块；
> 2. 创建一个web服务，先引入Nodejs 的 http 模块
> 3. http.createServer((req,res) => { }).listen();
> 4. 在创建好的服务中调用自己写的模块，并把 服务的req res以及静态文件的根目录传入模块；
> 5. 完成以上 就可以启动我我们的服务 node services.js
```js
const http = require('http');
const route = require('./model/router');

http.createServer((req,res) => {    // 创建一个服务

  route.static(req,res, 'static')   // 调用模块的方法

}).listen(9999)       // listen(端口号)
```