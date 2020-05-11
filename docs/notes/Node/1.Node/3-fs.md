# fs模块

---
Node.js内置的 fs 模块就是文件系统模块，负责读写文件；   
fs 模块同时提供了异步和同步的方法；
## 1. stat (检查)
  > 检查是文件还是目录
  ```js
  'use strict'
  const fs = require('fs');
  fs.stat('hello.js',(err, stats)=> {
    if(err) {
      console.log(err);
    } else {
      console.log(stats);   // 返回hello.js的文件信息对象
      console.log(`文件： ${stats.isFile()}`)     // 文件：true
      console.log(`目录： ${stats.isDirectory()}`)  // 目录： false
    }
  })
  ```
## 2. mkdir (创建)
  > 创建目录
  ```js
  'use strict'
  const fs = require('fs');
  fs.mkdir('hello',(err)=> {
    if(err) {
      console.log(err);
    }else {
      console.log('成功创建目录：hello') // 新创建的目录与当前js同级
    }
  })
  
  ```
## 3. readdir (读取)
  > 读取目录
  ```js
  'use strict'
  const fs = require('fs');
  // readdir 读取目录
  // 在刚创建的hello目录下，我们先创建一个文件 hello.js，看使用readdir读取出目录是什么样的；
  fs.readdir('hello',(err,files)=> {
    if(err) {
      console.log(err);
    }else {
      console.log(files);  // ['hello.js']
    }
  })
  ```

## 4. rmdir (删除)
  > 删除目录
  ```js
  // 既然能创建 能读取 那就能删除目录，此处代码将上面创建的目录删除；
  'use strict'
  const fs = require('fs');
  fs.rmdir('hello',(err) => {
    if(err) {
      console.log(err);
    }else {
      console.log('成功删目录： hello')
    }
  })
  ```

## 5. writeFile (创建写入)
  > 创建写入文件
  ```js
  // fs.writeFile 创建写入文件
  'use strict'
  const fs = require('fs');
  fs.writeFile('./hello.md', '### fs.writeFile 创建的写入文件', (err) => {
    if(err) {
      console.log(err)
    }else {
      console.log('成功写入文件！')
    }
  })

  ```
## 6. appendFile (追加)
  > 追加文件
  ```js
  'use strict'
  const fs = require('fs');
  fs.appendFile('./hello2.md', '### fs.appendFile 追加文件', (err) => {
    if(err) {
      console.log(err)
    } else {
      console.log('成功追加文件！')
    }
  })

  ```
## 7. readFile (读取)
  > 读取文件
  ```js
  'use strict'
  const fs = require('fs');
  fs.readFile('hello2.md', 'utf8', (err, data) => {
    if(err) {
      console.log(err)
    }else {
      console.log(data);   // data 是 hello.md 的内容
    }
  })

  ```
## 8. unlink (删除)
  > 删除文件
  ```js
  'use strict'
  const fs = require('fs');
  fs.unlink('hello2.md', (err) => {
    if(err) {
      console.log(err)
    }else {
      console.log('成功删除文件：hello2.md');
    }
  })
  ```

<h4 id='9-fsrename'>9. fs.rename</h4>

  > 重命名：可以对文件目录进行重命名；
  ```js
  'use strict'
  const fs = require('fs');
  fs.rename('./helloName.md', './hello.md', (err) => {
    if(err) {
      console.log(err)
    }else {
      console.log('重命名成功！');
    }
  });

  ```



