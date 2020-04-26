#### 一、基础组件参数传递

##### 1. url传递参数  

```js
// 传递
// 1. 在wxml中使用navigator跳转url传递参数 
<navigator url="../page/index?id={{data.ID}}"> ... </navigator>

// 2. 在JS中使用 路由跳转 url 传递参数
toPage() {
    const id = '12335444';
    wx.navigateTo({
        url: `/pages/index?id=${index}`
    })
}

// 获取
// 在js页面中onLoad方法中接收
Page({
    onLoad: function(options) {
        const _id = options.id;
        console.log(_id)
    }
})

```

##### data-* 自定义属性

> 组件上触发的事件时，会发送给事件处理函数, 通过wxml设置data-[参数名]传递参数，[参数名]只能是小写，不能有大写

```js

// xwxml
<view bindtap="clickMe" data-testid="{{testId}}"> ... </view>

// js
Page({
    clickMe: function(event) {
        var testId = event.currentTarget.dataset.testid;
    }
})

// 注：
//  1. target 在事件流的目标阶段； currentTarget 在事件流的捕获，目标冒泡阶段
//  2. event.currentTarget 指向事件所绑定的元素，而event.target始终指向事件发生时的元素
//  3. 事件真正的发送者是event.target(而且是可以变的，根据触发不同displayObject),注册侦听器的是event.currentTarget
```
