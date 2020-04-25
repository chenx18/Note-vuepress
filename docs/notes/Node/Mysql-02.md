### Nodejs Mysql驱动
对于Node.js程序，访问MySQL也是通过网络发送SQL命令给MySQL服务器。这个访问MySQL服务器的软件包通常称为MySQL驱动程序。不同的编程语言需要实现自己的驱动，MySQL官方提供了Java、.Net、Python、Node.js、C++和C的驱动程序，官方的Node.js驱动目前仅支持5.7以上版本，而我们上面使用的命令行程序实际上用的就是C驱动。   
目前使用最广泛的MySQL Node.js驱动程序是开源的mysql，可以直接使用npm安装。<br>

---
#### Mysql驱动
###### 1.安装 node.js的mysql模块
mysql模块是node操作MySQL的引擎，可以在node.js环境下对MySQL数据库进行建表，增、删、改、查等操作。
```js
  npm install --save mysql
```

https://segmentfault.com/a/1190000012186439?utm_source=tag-newest#articleHeader8
https://segmentfault.com/a/1190000009246144?share_user=1030000008125042#articleHeader0
https://juejin.im/post/5a979b055188257a58512037#heading-3