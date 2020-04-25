
 ### Node http url supervisor(自启工具)
 ---
  #####  Http模块
  **Http 模块创建使用**
  > 1. 引入： 首先在文件中require('http')模块；
  > 1. 创建： http.createServer().listen() 方法创建一个HTTP服务；
  > 1. 回调： createServer((req,res) => {})
    >> 3.1 res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
    >> // 状态码200， 文件类型HTML, 字符集UTF-8
    >> 3.2 res.end(): 结束响应；
  > 4. 端口号设置： listen(9999);
  ```js
  let http = require('http');
  http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
    res.end('http模块');
  }).listen(9999);
  ```

  #####  Url模块
  > url.parse() 解析URL;    
  > url.format(urlObject) 是url.parse()的逆向操作；   
  > url.resolve(from, to) 添加或者替换地址；
  ```js
    var http=require('http');
    var url=require('url');

    //2.用http模块创建服务
    /*
    req获取url信息   （request）
    res 浏览器返回响应信息 （response）
    * */
    http.createServer(function(req,res){

    //输入http://localhost:8001/news?aid=123   拿到aid

    // 输入http://localhost:8001/news?aid=123&cid=3   拿到aid 和cid

    //req.url  获取浏览器url输入的信息
        //var query=url.parse(req.url,true);
        //
        //
        //console.log(query);
        res.writeHead(200,{"Content-Type":"text/html;charset='utf-8'"});
        if(req.url!='/favicon.ico'){
            //http://localhost:8001/news?aid=123
            //console.log(req.url);  //返回  /news?aid=123
            var result=url.parse(req.url,true);  //第一个参数是地址    第二个参数是true的话表示把get传值转换成对象
            console.log('aid='+result.query.aid);  /*获取url的get传值*/
            console.log('cid='+result.query.cid);
        }
        res.write('你好 nodejs');
        res.end(); /*结束响应*/
    }).listen(8001);
  ```

  ##### supervisor 自启工具
   > supervisor会不停的watch你应用下面的所有文件，发现文件有修改时， 就会重新载入程序文件实现部署，修改了程序文件后马上就能看到修改后的效果
  **安装 使用**
  ```js
  npm install -g supervisor
  // 全局安装supervior

  supervisor name.js
  // 使用supervisor代替 node 命名启动应用
  ```