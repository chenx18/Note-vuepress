#### Data的赋值与取值

> Page() 函数用来注册一个页面，接受一个object参数，其中指定页面的初始数据、生命周期函数、事件处理函数等。其中的参数data用来设置初始数据， wxml中的动态数据均来自对应 Page 的 data；

##### 1. 初始data

```js
Page({
    data: {
        mesg: 'Hello word!'
    }
})
```

##### 2. wxml中使用Data

```js
<view>{{mesg}}</view>
```

##### 2. js中 获者 设置 Data

> this.setData({}) / this.data.xxxx

```js
Page({
    data: {
        mesg2: 'hello'
    }
    setData() {
        this.setData({
            mesg2: 'Hello word!'
        })
    }

    getData(){
        const val = this.data.mesg3;
    }
})
```
