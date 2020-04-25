#### 事件处理函数

<a href="https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html#%E4%BA%8B%E4%BB%B6%E8%AF%A6%E8%A7%A3">更多事件》</a>

> 事件是视图层到逻辑层的通讯方式：  
> 事件可以将用户的行为反馈到逻辑层处理；  
> 事件可以绑定在组件上，当达到触发事件，就会执行逻辑层对应的事件处理函数；  
> 事件对象可以携带额外的信息，如 id dataset touches；  

##### 1. 冒泡事件和非冒泡事件

+ 1.冒泡事件： 当一个组件上的事件被触发后，该事件会向父节点传递；(bindtap) 
+ 2.非冒泡事件： 当一个组件上的事件被触发后， 该事件不会向父节点传递；(catchtap)
+ 一般使用场景中，如一个列表的item中用多个事件需要处理，就可以使用catchtap阻止向上冒泡；

##### 2. bind （冒泡事件）

```js
// 当我们点击3时  click2 click1 事件也会执行；
// 同理 点击2时   click1 事件也执行；
// wxml
<view bindtap="click1">
    1
    <view bindtap="click2">
        2
        <view bindtap="click3">
            3
        </view>
    </view>
</view>

// js
click1() {
    console.log('click1');
}
click2(){
    console.log('click2')
}
click3(){
    console.log('click3')
}
```

##### 2. catch （非冒泡事件）

> 以下代码中click3 使用的非冒泡事件 点击3时 将只执行3的事件

```js
// wxml
<view bindtap="click1">
    1
    <view bindtap="click2">
        2
        <view catchtap="click3">
            3
        </view>
    </view>
</view>

// js
click1() {
    console.log('click1');
}
click2(){
    console.log('click2')
}
click3(){
    console.log('click3')
}
```
