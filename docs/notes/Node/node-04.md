### 流

流是一种抽象的数据结构。想象水流，当在水管中流动时，就可以从某个地方（例如自来水厂）源源不断地到达另一个地方（比如你家的洗手池）。我们也可以把数据看成是数据流，比如你敲键盘的时候，就可以把每个字符依次连起来，看成字符流。这个流是从键盘输入到应用程序，实际上它还对应着一个名字：标准输入流（stdin）。   

---

#### stream
  stream是Node.js提供的又一个仅在服务区端可用的模块，目的是支持“流”这种数据结构。
###### fs.createReadStream
  > 从文件流中读取数据
  ```js
  'use strict'
  const fs = require('fs');
  // fs.createReadStream 从文件流中读取数据
  const fileReadStream = fs.createReadStream('./hello.text', 'utf-8');
  fileReadStream.on('data',(chunk) => {
    console.log('data');  // data
    console.log(chunk);   // hello.text内容（Hello word!）
    // 要注意，data事件可能会有多次，每次传递的chunk是流的一部分数据。
  })
  fileReadStream.on('end',(end) => {
    console.log('结束')   // 结束
  })
  fileReadStream.on('error',(err) => {
    console.log(err);
  });

  ```
###### fs.createWriteStream
  > 以流的形式写入文件
  ```js
  'use strict'
  const fs = require('fs');

  const wrs = fs.createWriteStream('hello.txt');
  wrs.write('以流的形式写入文件流.......\n', 'utf-8');
  wrs.write('结束');
  wrs.end();
  // output.txt
  //  以流的形式写入文件流.......
  //  结束

  const wrs2 = fs.createWriteStream('output.text');
  wrs2.write(new Buffer('使用stream写入二进制数据......\n', 'utf-8'))
  wrs2.write(new Buffer('end', 'utf-8'));
  wrs2.end();
  // output.text： 
  //   以流的形式写入文件流.......
  //   结束
  ```

#### pipe
就像可以把两个水管串成一个更长的水管一样，两个流也可以串起来。一个Readable流和一个Writable流串起来后，所有的数据自动从Readable流进入Writable流，这种操作叫pipe。    
在Node.js中，Readable流有一个pipe()方法，就是用来干这件事的。

```js
'use strict';
const fs = require('fs');

const wrs = fs.createReadStream('hello.txt');
const wrs2 = fs.createWriteStream('output.text');

// 读取 hello.txt 文件内容，并将内容写入到 output.txt 文件中
wrs.pipe(wrs2);

//  默认情况下，当Readable流的数据读取完毕，end事件触发后，将自动关闭Writable流。如果我们不希望自动关闭Writable流，需要传入参数：
wrs.pipe(wrs2, { end: false });

```