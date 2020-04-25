### Nodejs 路由
---
#### 官方解释：
路由（Routing）是由一个 URI（或者叫路径）和一个特定的 HTTP 方法（GET、POST 等）组成
的，涉及到应用如何响应客户端对某个网站节点的访问。

#### 非官方解释：
路由指的就是针对不同请求的 URL，处理不同的业务逻辑。

#### services.js
```js

const http=require('http');   //引入http模块
const url=require('url');

//路由:指的就是针对不同请求的 URL，处理不同的业务逻辑。
http.createServer(function(req,res){
	let pathname=url.parse(req.url).pathname;
	if(pathname=='/login'){
		res.end('login');
	}else if(pathname=='/register'){
		res.end('register');
	}else if(pathname=='/order'){
		res.end('order');
	}else{
		res.end('index');
	}
}).listen(9999);

```