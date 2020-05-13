#### ORM
 > 简单的讲就是对SQL查询语句的封装，让我们可以用OOP的方式操作数据库，优雅的生成安全、可维护的SQL代码。直观上，是一种Model和SQL的映射关系
#### Sequelize
> 同时支持PostgreSQL, MySQL, SQLite and MSSQL多种数据库，很适合作为Nodejs后端数据库的存储接口，为快速开发Nodejs应用奠定扎实、安全的基础。   
> 既然Nodejs的强项在于异步，没有理由不找一个强大的支持异步的数据库框架，与之配合。  
> 为了使 Sequelize 与 MySQL 完美结合，您需要安装 mysql2@^1.0.0-rc.10 或更高版本。 
> 对于 SQLite 兼容性，您将需要 sqlite3 @〜3.0.0      
<a href="http://docs.sequelizejs.com/manual/getting-started.html" target="_blank">[官网]</a> 
<a href="http://docs.sequelizejs.com/manual/getting-started.html" target="_blank">[github]</a> 
<a href="http://docs.sequelizejs.com/manual/getting-started.html" target="_blank">[教程]</a> 
<a href="https://itbilu.com/nodejs/npm/VkYIaRPz-.html" target="_blank">[IT笔录]</a> 
<a href="https://sequelize.readthedocs.io/en/latest/api/sequelize/#models" target="_blank">[教程2]</a> 

#### 一、Sequelize安装
```
1. Sequelize可通过npm（或纱线）获得。
$ npm install --save sequelize

2. 安装所选数据库的驱动程序(其中一个)
$ npm install --save pg pg-hstore
$ npm install --save mysql2
$ npm install --save sqlite3
$ npm install --save tedious // MSSQL
```

#### 二、Sequelize实例化
---
> 要连接到数据库，您必须创建Sequelize实例。这可以通过将连接参数分别传递给Sequelize构造函数或传递单个连接URI来完成   

1. 实例示例：
```js
// 不使用密码和选项
var sequelize = new Sequelize('database', 'username')

// 不使用选项
var sequelize = new Sequelize('database', 'username', 'password')

// 不使用密码/空密码
var sequelize = new Sequelize('database', 'username', null, options)

// 使用密码和选项
var sequelize = new Sequelize('database', 'username', 'password', options)
```

 2. options 参数 <a href="http://docs.sequelizejs.com/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor" target="_blank">[options]</a>
---
名称 | 类型 |  说明  
-|-|-
database | String | 数据库名
[username=null] | String | 数据库用户名
[password=null] | String | 数据库密码
[options={}] | Object | 参数对象
[options.dialect='mysql'] | String | 要连接的数据库类型。可选值有：mysql、postgres、sqlite、mariadb、mssql
[options.dialectModulePath=null] | String | 指定后，将通过此路径模块加载数据库
[options.dialectOptions] | Object | 路径模块所使用的扩展选项
[options.storage] | String | 仅用于sqlite， 默认为':memory:'
[options.host='localhost'] | String | 连接数据库的主机
[options.port=] | String | 连接数据库的端口
[options.protocol='tcp'] | String | 连接数据库使用的协议
[options.define={}] | Object | 定义模型的选项，默认为'sequelize.define'选项
[options.query={}] | Object | 'sequelize.query'的默认选项
[options.set={}] | Object | 'sequelize.set'的默认选项
[options.sync={}] | Object | 'sequelize.sync'的默认选项
[options.timezone='+00:00'] | String | 时间转换时从数据库得到的JavaScript时间。这个时区将应用于连接服务器的 NOW、CURRENT_TIMESTAMP或其它日期函数
[options.logging=console.log] | Function | 用于Sequelize日志打印的函数
[options.omitNull=false] | Boolean | null值是否通过SQL查询
[options.native=false] | Boolean | 是否使用本地库，仅用于 postgres
[options.replication=false] | Boolean | 是否使用读/写复制(读写分离)。要启用读/写复制，需要传递一个对象，这个对象有read、write两个属性。write是一个单一的对象(由单台服务器处理写入)，而read是一个包含对象的数组(由多台服务器处理读取)。每台read、write服务器都可以包含以下属性：host、port、username、password、database。读写分离的使用请参考：Sequelize 实现数据库读写分离   
[options.pool={}] | Object | sequelize连接池配置
[options.pool.max] | Integer	 
[options.pool.min] | Integer	 
[options.pool.idle] | Integer | 连接最大空置时间（毫秒），超时后将释放连接
[options.pool.acquire] | Function | 连接验证函数
[options.quoteIdentifiers=true] | Boolean | 设置为false时Postgres中会使表名和属性大小写不敏感，并跳过双引号
[options.transactionType='DEFERRED'] | String | 设置事务类型，详见Sequelize.Transaction.TYPES。仅Sqlite适用
[options.isolationLevel='REPEATABLE_READ'] | String | 设置事件的隔离级别，详见Sequelize.Transaction.ISOLATION_LEVELS
[options.retry] | Object | 设置自动查询时的重试标志
[options.retry.match] | Array | 匹配到指定的错误字符串之一后重试查询
[options.retry.max] | Integer | 设置重试次数
[options.typeValidation=false] | Boolean | 在插入、更新等操作时执行类型验证
[options.benchmark=false] | Boolean | 在打印执行的SQL日志时输出执行时间（毫秒）；

#### 三、sequelize.authenticate() 测试连接
> 可以使用.authenticate()函数来测试连接是否正常：
```js
sequelize.authenticate() .then(() => {
  console.log('连接成功.');
})
.catch(err => {
  console.error('连接失败:', err);
});
```

#### 四、定义表模型（sequelize.define）
> public define(modelName: string, attributes: Object, options: Object): Model    

名称 | 类型 |  描述  
-|-|-
modelName | String | 模型的名称
[attributes={}] | Object | 一个对象，其中每个属性都是表的一列
[attributes.type] | String|DataTypes | 字段类型
[attributes.allowNull] | boolean | 是否允许为空，默认为true
[attributes.defaultValue] | String|null | 默认值，默认为null
[attributes.unique] | boolean | 值唯一，默认为false
[attributes.primaryKey] | boolean | 是否为主键，默认为false
[attributes.field] | String | 数据库中字段的实际名称
[attributes.autoIncrement] | boolean | 是否自增，默认false
[options={}] | Object | 这些选项与提供给Sequelize构造函数的默认define选项合并，并传递给Model.init（）
[options.timestamps] | Object | 是否给每条记录添加 createdAt 和 updatedAt 字段，并在添加新数据和更新数据的时候自动设置这两个字段的值，默认为true
[options.paranoid] | Object | 设置 deletedAt 字段，当删除一条记录的时候，并不是真的销毁记录，而是通过该字段来标示，即保留数据，进行假删除，默认为false
[options.freezeTableName] | Object | 禁用修改表名; 默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数。 默认为false
[options.tableName] | Object | 手动设置表的实际名称
[options.indexes] | Array Object | 定义表索引
[options.indexes[].name] | String | 索引的名称。默认为模型名称+ _ +字段连接
[options.indexes[].type] | String | 索引类型。仅供mysql使用。其中之一UNIQUE，FULLTEXT和SPATIAL
[options.indexes[].using] | String | 通过（USINGSQL中的语句）创建索引的方法。BTREE和HASH由mysql和postgres支持，postgres还支持GIST和GIN。
[options.indexes[].operator] | String | 指定索引运算符
[options.indexes[].unique] | boolean | 唯一索引，默认false
[options.indexes[].concurrently] | boolean | PostgresSQL将构建索引而不需要任何写锁
[options.indexes[].fields] | Array string|Object | 要索引的字段数组。
[更多] | · | http://docs.sequelizejs.com/class/lib/model.js~Model.html#static-method-init

#### 五、模型
Model表示数据库中的表。此类的实例表示数据库行。<a href="http://docs.sequelizejs.com/class/lib/model.js~Model.html" target="_blank">[Model]</a>   
```JS
(async () => {
  // 1. 引入
  const Sequelize = require('sequelize');

  // 2. 创建连接池
  const db = new Sequelize('sequelizes', 'root', 'password123', {
    host: 'localhost',     // 连接的数据库主机; 默认值: localhost
    port: 3306,            // 连接的数据库端口; 默认值: 3306
    dialect: 'mysql',      // 连接的数据库类型('mysql', 'sqlite', 'postgres', 'mssql')
    timezone: '+08:00',    // 设置时区
    pool: {
      max: 5,   // 池中的最大连接数
      min: 0,   // 池中的最小连接数
      idle: 10000,    // 连接在释放之前可以空闲的最长时间（以毫秒为单位）
      acquire: 30000  // 池抛出错误之前尝试获取连接的最长时间（以毫秒为单位）
    },
  });

  // 3. 测试连接(authenticate)
  db.authenticate().then(() => {
      console.log('成功');
    })
    .catch(err => {
      console.error('失败:', err);
    });
    
  // 4. define （定义模型）
  // model定义格式为sequelize.define('name', {attributes}, {options})：
  const userModel = db.define('user', {
    id: {
      type: Sequelize.INTEGER(10), // 字段类型
      allowNull: false, // 是否允许为空，默认为true
      primaryKey: true, // 是否为主键，默认为false
      autoIncrement: true // 是否自增，默认false
    },
    username: {
      type: Sequelize.STRING(255), // 字段类型
      allowNull: false, // 是否允许为空，默认为true
      defaultValue: ''  // 默认值，默认为null
    },
    age: {
      type: Sequelize.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    gender: {
      type: Sequelize.ENUM(['男', '女', '默认']),
      allowNull: false,
      defaultValue: '男'
    }
  },{
    // 用来设置字段以外的其他信息
    timestamps: false,
    paranoid: false,
    freezeTableName: true,
    tableName: 'user',
    indexes: [
      {
        name: 'uname',
        fields: ['username']
      },
      {
        name: 'age',
        fields: ['age']
      }
    ]
  })

  /**
   * 5.sync （将模型同步到数据库）
   * 可以选择在 应用/服务器 启动的时候，把 uuser 映射到数据库中，比如这里会在数据库中自动创建一张表: users
   *  如果 force 为 true, 则每次都会重建表 users
   */
  await userModel.sync({
    force: true,
  }).then(res => {
    console.log('createTable:', res);
  });

  /**
   * build
   * build（values： Object | Array，options： Object）： Model | 数组 < Model >
   * 构建一个新的模型实例，但创建之后要用save命令存入数据库中
   */
  await userModel.build({
    username: 'Abby2',
    age: 26,
    gender: '男'
  }).save().then(res => {
    console.log('build:', res);
  })

  /**
   * create
   * create（values： Object，options： Object）： Promise < Model >
   * 构建一个新的模型实例并调用save
   */
  await userModel.create({
    username: 'Create',
    age: 18,
    gender: '女'
  }).then(res => {
    console.log('createUser:', res);
  })

  /**
   * findAll
   * findAll（options： Object）： Promise < Array < Model >>
   * 搜索多个实例（搜索多条数据） 
   */
  // 查询所有
  await userModel.findAll().then(res => {
    console.log('findAll:' + res);
  }).then(res => {
    console.log('findAll:', res);
  })
  // 条件查询
  await userModel.findAll({
    where: {
      // 单条件
      username: 'Hello',    //  username = 'Hello'
      username: {
        [Sequelize.Op.eq]: 'Hello'   //和上面一致
      },
      // 多条件
      [Sequelize.Op.or]: [
        {
          age: {
            [Sequelize.Op.gt]: 18
          }
        },
        {
          gender: '女'
        }
      ]
    }
  }).then(res => {
    console.log('finds:' + res)
  })

  /**
   * 修改数据 
   */
  await userModel.update({
    username: 'Hello'
  },{
    where: {
      id: 1
    }
  }).then(res => {
    console.log('updata:' + res);
  });

  /**
   * destroy
   * destroy（options： Object）： Promise < number >
   * 删除多个实例，或者将enabledAt时间戳设置为当前时间（如果paranoid已启用）。
   */
  await userModel.destroy({
    where: {id:1}
  }).then(res => {
    console.log('destory:', res);
  })

})();



```

