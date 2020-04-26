#### 双向数据绑定

> 在微信小程序中，js的数据和前端显示的数据是单数据流，也就是说，js里边的数据变了，前端能立刻显示；但如果前端数据变了，js不能改变。

#### 实现数据双向绑定

##### 无点击按钮实现

```js
// wxml
<input  placeholder="输入关键字" bindinput="bindKeyInput"></input>
<text>{{ sugData }}</text>

//js
Page({
  data: {
    sugData:''
  },
  bindKeyInput: function(e){
    this.setData({
      sugData:e.detail.value;
    })
  },
})
```

##### form表单中通过点击按钮实现数据绑定

```js
//wxml
<view class='section'>
  <form bindsubmit='submiting'>
      <input name="name" bindinput="bindInput" data-item="name" placeholder="请输入姓名" placeholder-style="color:#ccc;" value="{{user.name}}" />
      <input name="company" bindinput="bindInput" data-item="company" placeholder="请输入公司名称" placeholder-style="color:#ccc;" value="{{user.company}}"/>
      <input name="position" bindinput="bindInput" data-item="position"  placeholder="请输入职务名称" placeholder-style="color:#ccc;" value="{{user.position}}"/>
      <button  form-type='submit'>提交</button>
  </form>
  <text>{{ sugData }}</text>
</view>
//js
Page({
    data: {
        user:{
            name:"",
            company: "",
            position: "",
        }
    },
    bindInput: function(e){
        let item = e.currentTarget.dataset.item; //在每个input绑定不同的item作为标识
        const user = this.data.user
        user[item] = e.detail.value //对象的属性名称是动态判定时，通过方括号标记访问
        this.setData({
            user
        })
    }
    submiting:function(e){
        console.log(e.detail.value.keyword)
    }
})
```
