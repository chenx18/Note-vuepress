#### 全局变量定义

> 在app.js中的APP({})传入对象中定义一个全局属性globalData，作为保存全局变量的对象。

```js
// app.js
    App({
        globalData: {//全局变量
            key: key,
        }
    })

// 全局变量使用
    //在page页面引入app，同时声明变量，获得所需要的全局变量
    const app = getApp();
    const key = app.globalData.key;
```
