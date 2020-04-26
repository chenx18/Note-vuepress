### Mysql 
<a href="https://www.cnblogs.com/laumians-notes/p/9069498.html" target="_blank">Mysql 安装教程1</a>   
<a href="https://www.jianshu.com/p/647a596cb251" target="_blank">Mysql 安装教程2</a>  
<a href="https://blog.csdn.net/qq_37350706/article/details/81707862" target="_blank">Mysql 安装教程3</a>  


#### 一、Mysql安装：
###### 1. 下载zip安装包：
  > MySQL8.0 For Windows zip包下载地址:https://dev.mysql.com/downloads/file/?id=476233，进入页面后可以不登录。后点击底部“No thanks, just start my download.”即可开始下载。    
###### 2. 环境变量配置：
  > 将解压文件夹下的bin路径添加到变量值中，前后以 ; 开头结尾    

###### 3. 配置初始化的my.ini文件:
  我们发现解压后的目录并没有my.ini文件，没关系可以自行创建。在安装根目录下添加 my.ini（新建文本文件，将文件类型改为.ini），写入基本配置：
```js
  [mysqld]
  # 设置3306端口
  port=3306

  # 自定义设置mysql的安装目录，即解压mysql压缩包的目录
  basedir=D:\Program Files\MySql-8.0.15\mysql-8.0.15-winx64

  # 自定义设置mysql数据库的数据存放目录
  datadir=D:\Program Files\MySql-8.0.15\mysqlData

  # 允许最大连接数
  max_connections=200

  # 允许连接失败的次数，这是为了防止有人从该主机试图攻击数据库系统
  max_connect_errors=10

  # 服务端使用的字符集默认为UTF8
  character-set-server=utf8

  # 创建新表时将使用的默认存储引擎
  default-storage-engine=INNODB

  # 默认使用“mysql_native_password”插件认证
  default_authentication_plugin=mysql_native_password

  [mysql]
  # 设置mysql客户端默认字符集
  default-character-set=utf8

  [client]
  # 设置mysql客户端连接服务端时默认使用的端口和默认字符集
  port=3306
  default-character-set=utf8
```

###### 4. 初始化数据库: mysqld --initialize --console （进入安装目录的bin目录下执行命令）

> [MY-010454] [服务器]为root @ localhost生成临时密码：9P0gYk-？0，kT其中root @ localhost：后面的9P0gYk-？0，kT就是初始密码（不含首位空格）。
在没有更改密码前，需要记住这个密码，后续登录需要用到。复制密码先保存起来!!!

###### 5. 设置服务名：
  > mysqld --install [服务名]（服务名可以不加默认为mysql）

###### 6. 启动：
  > net start mysql

###### 7. 停止：
  > net stop mysql

###### 8. 卸载: 
  > sc delete mySQL

###### 9. 登录mysql：
  > mysql -h 主机名 -u 用户名 -p  
  > -h : 该命令用于指定客户端所要登录的MySQL主机名, 登录当前机器该参数可以省略; 
  > -u : 所要登录的用户名;  
  > -p : 告诉服务器将会使用一个密码来登录, 如果所要登录的用户名密码为空, 可以忽略此选项。 
  > mysql -u root -p

###### 10. 修改密码：
```text
  第一次先用初始密码登录之后在去修改密码;     
  ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '新密码';
```
  

#### 二、Navicat for MySQL可视化工具：
  <a href="https://blog.csdn.net/wypersist/article/details/79834490" target="_blank">Navicat for MySQL 安装破解</a>

#### 三、基本操作：
1.  登录mysql：
> mysql -u root -p

2. 查看所有数据库
> show databases;

3. 选择要操作的数据库
> use name     
>   name：选择要操作的数据库名称    
> show tables;  --- 查看内容

4. 创建新的数据库
> create database name;   --- name：创建的数据库名称