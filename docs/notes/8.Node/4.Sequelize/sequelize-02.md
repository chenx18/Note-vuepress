### sequelize-cli

#### 一、 数据库迁移
1. 就像git一样，我们可以使用Sequelize迁移来帮助我们跟踪数据库的更改，并在各个不同时期的数据库状态之间进行切换   
2. sequelize-cli用于支持数据迁移和项目引导。通过迁移，可以将现有数据库迁移到另一个状态，反之亦然：这些迁移文件会被保存在迁移文件中，迁移文件描述了怎样到达新状态以及如何恢复更改以返回到迁移前的旧状态。    
<a href="https://itbilu.com/nodejs/npm/VyqgRUVf7.html">参考</a>

#### 二、 sequelize-cli使用
  <h5 id=""> 1. 安装 sequelize 、mysql2 、 sequlize-ci </h5>

  ```
    npm install --save sequelize sequelize-cli mysql2
    或者
    npm install --save sequelize
    npm install --save mysql2
    npm install --save sequelize-cli
  ```
  <h5 id=""> 2. 初始化 sequlize </h5>

  > （1） 初始化: node_modules/.bin/sequelize init 
  > （2） 注：'node_modules' 不是内部或外部命令 错误时上面命令使用反斜杠  node_modules\.bin\sequelize init  
  ```html
  初始化sequelize项目，该命令将创建如下目录：      
  - config：包含配置文件，它告诉CLI如何连接数据库   
  - models：包含您的项目的所有模型    
  - migrations：包含所有迁移文件    
  - seeders：包含所有种子文件   
  ```
  <h5 id=""> 3. 创建删除数据库</h5>

  1. 创建数据库    
  ```js
  // 根据confing中的配置创建数据库   
    node_modules/.bin/sequelize db:create   
  // 如果数据库已存在，会报错：ERROR: database "xxx" already exists
  ```
  2. 删除数据库 
  ```js
  node_modules/.bin/sequelize db:drop
  // 根据配置删除数据库

  ```
  <h5 id=""> 4. 创建模型（model:generate / model:create） </h5>

  （1） 创建模型运行 model:generate / model:create 命令；   
  （2） 完成后在 models 文件夹中创建了一个 user 模型文件（供程序使用）    
  （3） 完成后在 migrations 文件夹中创建了一个名字像 XXXXXXXXXXXXXX-create-user.js 的迁移文件（供迁移使用）
  ```js
  node_modules/.bin/sequelize model:create --name xx --attributes xx
  // -- name：模型名称，必须
  // -- attributes：字段列表，必须
  // 例：node_modules/.bin/sequelize model:create --name User --attributes id:INTEGER
  ```

  <h5 id=""> 5. 执行迁移 / 撤销迁移 </h5>

  > 注： 所谓迁移，就是对数据库进行结构的创建，升级（修改）等操作   

  （1） 执行 db:migrate 命名迁移：   
      --会在数据库中创建一个 SequelizeMeta 表，用于记录每次的迁移记录   
      --执行 migrations 文件下的满足条件（SequelizeMeta表）的脚本  
  ```js
    node_modules/.bin/sequelize db:migrate
  ``` 
  （2） 撤销上一次的迁移：  
  ```js
    db:migrate:undo
  ``` 
  （3） 撤销所有的迁移：   
  ```js
    db:migrate:undo:all
  ``` 
  （4） 具体迁移脚本：   
  ```js
    db:migrate:undo --name
  ``` 

  <h5 id=""> 6. 种子(创建-执行-撤销)</h5>

  > 迁移文件是用来构建数据库以及表结构的，种子文件是用来构建数据的;种子文件脚本与迁移脚本类似，由up于down函数组成，传入的参数也是一致的;

  （1）创建种子
  ```
    seed:generate --name XX
    // seeders 文件夹中创建一个种子文件，文件名看起来像是 XXXXXXXXXXXXXX-XX.js
  ```
  （2）运行所有未执行过的种子
  ```
  node_modules/.bin/sequelize db:seed:all
  ```
  （3）撤销所有种子
  ```
  node_modules/.bin/sequelize db:seed:undo:all
  ```


  <h5 id=""> 7. CLI使用帮助 </h5>

  ```
  Sequelize CLI [Node: 10.14.2, CLI: 5.4.0, ORM: 4.42.0]

  sequelize [命令]

  命令：
  sequelize db:migrate                        运行待执行的迁移
  sequelize db:migrate:schema:timestamps:add  更新迁移表以获取时间戳
  sequelize db:migrate:status                 列出所有迁移的状态
  sequelize db:migrate:undo                   恢复迁移
  sequelize db:migrate:undo:all               恢复所有迁移
  sequelize db:seed                           运行指定的种子
  sequelize db:seed:undo                      撤消最近执行的种子
  sequelize db:seed:all                       运行所有种子
  sequelize db:seed:undo:all                  撤消所有已执行的种子
  sequelize db:create                         创建配置中指定的数据库
  sequelize db:drop                           删除配置中指定的数据库
  sequelize init                              初始化项目
  sequelize init:config                       初始化配置
  sequelize init:migrations                   初始化迁移
  sequelize init:models                       初始化模型
  sequelize init:seeders                      初始化种子
  sequelize migration:generate                生成新的迁移文件                         [aliases: migration:create]
  sequelize model:generate                    生成一个模模型及期迁移文件                 [aliases: model:create]
  sequelize seed:generate                     生成一个新的种子文件                      [aliases: seed:create]

  选项：
    --help     显示帮助信息                                                              [布尔]
    --version  显示版本号                                                                [布尔]
  ```


  