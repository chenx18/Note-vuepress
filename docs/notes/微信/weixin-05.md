#### 1. 自定义组件

<a href="https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/">官方自定义组件</a>

> 1.小程序开发者工具提供了自定义组件选项；  
> 2.自定义组件类似于页面，json wxml wxss js 4个文件组成。要编写一个自定义组件，首先需要在 json 文件中进行自定义组件声明（将 component 字段设为 true 可将这一组文件设为自定义组件）  

```js
{
  "component": true
}
```

#### 2. Component 构造器

> component 构造器可用于定义组件，调用Component 构造器时可以指定组件的属性 数据 方法等；

##### 3. 组件 和 页面 通信/事件

```js
// 页面调用
    // wxml
    <singList id='singList'
        value1='str'
        value2='{{obj}}'
        isShow='{{isShow}}'
        bindaction='exFun' //exFun是你想要在组件里调用的方法名 bind + triggerEvent函数的事件名
        ></songlist>

    // js
    Page({
        data:{
            obj:{ a:"one", b:"two" } ,
            isShow:false
        },
        //此处的方法名exFun和wxml里的是一致的
        exFun(v){
            console.log(v)//是一个对象
            console.log(v.detail.show) // 就可以拿到组件里isShow的值
        }
    })

// 组件中逻辑
Component({
    properties: {
    //配置页面传过来的值,key值要一一对应
    'value1':{
        type:String, //必填，目前接受的类型包括：String,Number,Boolean, Object, Array, null（表示任意类型）
        value:"" //可选，默认值，如果页面没传值过来就会使用默认值 
    },
    'value2':{
        type:Object, //必填，目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型
        value:"" //可选，默认值，如果页面没传值过来就会使用默认值 
        },
    'isShow':{
        type:Boolean, //必填，目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
        value:"" //可选，默认值，如果页面没传值过来就会使用默认值 
        }
    },
    methods(){
        fun(){
        this.triggerEvent("action",{{show:this.data.isShow}}); //triggerEvent函数接受三个值：事件名称、数据、选项值
        }
    }
})
```

##### 4. 组件 和 组件 通信/事件

> 例如：custom-ul 和 custom-li 都是自定义组件，它们有相互间的关系，相互间的通信往往比较复杂。此时在组件定义时加入 relations 定义段  
> relations 定义段: 包含目标组件路径及其对应选项( <a href="https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/relations.html">详细</a> )  

```js
// 注意：必须在两个组件定义中都加入relations定义，否则不会生效。
// path/to/custom-ul.js
Component({
  relations: {
    './custom-li': {
      type: 'child', // 关联的目标节点应为子节点
      linked: function(target) {
        // 每次有custom-li被插入时执行，target是该节点实例对象，触发在该节点attached生命周期之后
      },
      linkChanged: function(target) {
        // 每次有custom-li被移动后执行，target是该节点实例对象，触发在该节点moved生命周期之后
      },
      unlinked: function(target) {
        // 每次有custom-li被移除时执行，target是该节点实例对象，触发在该节点detached生命周期之后
      }
    }
  },
  methods: {
    _getAllLi: function(){
      // 使用getRelationNodes可以获得nodes数组，包含所有已关联的custom-li，且是有序的
      var nodes = this.getRelationNodes('path/to/custom-li')
    }
  },
  ready: function(){
    this._getAllLi()
  }
})

// path/to/custom-li.js
Component({
  relations: {
    './custom-ul': {
      type: 'parent', // 关联的目标节点应为父节点
      linked: function(target) {
        // 每次被插入到custom-ul时执行，target是custom-ul节点实例对象，触发在attached生命周期之后
      },
      linkChanged: function(target) {
        // 每次被移动后执行，target是custom-ul节点实例对象，触发在moved生命周期之后
      },
      unlinked: function(target) {
        // 每次被移除时执行，target是custom-ul节点实例对象，触发在detached生命周期之后
      }
    }
  }
})
```
