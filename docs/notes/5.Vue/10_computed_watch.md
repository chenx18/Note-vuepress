# 计算属性computed/侦听属性watch

[Vue的computed和watch的细节全面分析](https://segmentfault.com/a/1190000012948175?utm_source=tag-newest)

## 计算属性computed

- 计算属性，类似于过滤器，对绑定到view的数据进行处理；
- 在页面中使用大量或复杂的表达式处理数据，对页面维护会有很大的影响，这就可以是用计算属性来处理复杂的逻辑运算；
- computed 一般会改变data或者props里面的值为己用；
- computed的值不可以在data中定义和赋值；
  
***基础用法***

```js
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
```

***get和set用法***

```js
data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    paramsIMEI() {
      return this.$route.params.imei;
    },
    fullName：{
        get(){//回调函数 当需要读取当前属性值是执行，根据相关数据计算并返回当前属性的值
                return this.firstName + ' ' + this.lastName
            },
        set(val){//监视当前属性值的变化，当属性值发生变化时执行，更新相关的属性数据
            //val就是fullName的最新属性值
            console.log(val)
            const names = val.split(' ');
            console.log(names)
            this.firstName = names[0];
            this.lastName = names[1];
        }
   }
  }
```

## 侦听属性watch

- watch是一个观察的动作，当需要在数据变化时执行异步或者开销较大的操作是，非常有用；
- 也可以进行深度监听，监听对象的变化

```js
data(){
    return {
        person: {
            firstname: "aaa",
            lastname: "jons",
            fullname: ""
        }
    }
},
methods: {
    getData(val) {
        this.name = val + '方法被调用';
    }
}
computed: {
    paramsIMEI() {
      return this.$route.params.imei;
    },
}
watch: {
    // 如果发生改变，这个函数就会运行
    paramsIMEI(val) {
        this.getData(val)
    },
    // 深度监听
    person:{
        handler(newVal,oldVal) {
            this.person.fullname = newVal.firstname + ' ' + this.person.lastname;
        }
    }
},

```

## computed和watch的区别

1. computed特性：
   1. 计算属性，简化了tempalte里面 {{数据}} 计算和处理props或$emit的传值
   2. 具有缓存性，页面重新渲染值不变化,计算属性会立即返回之前的计算结果，而不必再次执行函数

2. watch
   1. 观察动作，监听props，$emit或本组件的值执行异步操作；
   2. 无缓存性，页面重新渲染时值不变化也会执行
