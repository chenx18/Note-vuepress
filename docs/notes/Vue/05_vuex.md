# vuex

>如果你的才华还实现不了你的野心，那就静下心来，埋头苦干。有志者事竟成破釜成舟百二秦关终属楚，苦心人天不负卧薪尝胆三千越甲可吞吴！

[Vuex原理解析](https://juejin.im/post/5d87397c6fb9a06b141821bc)
[Vuex详解](https://segmentfault.com/a/1190000015782272)
[Vuex状态管理模式](https://blog.csdn.net/xu838209490/article/details/80334283)

> Vuex 是一个专门为vue.js应用程序开发的状态管理模式。采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。  
> 相当于一个数据库 任何组件都可以存取仓库中的数据
> 采用MVC模式中的model层，规定所有的数据必须通过action -> mution -> state这个流程进行改变状态
> vue与vuex响应关系： 可以通过vuex实现和vue同样的响应式功能
> 总结： Vuex是通过全局注入store对象来实现组件间的状态共享，在大型项目中（多级组件嵌套），需要实现一个组件更改某个数据，多个组件自动获取更改后的数据进行业务逻辑处理，这时候使用vuex比较合理。假如只是多个组件间传递数据，只使用组件间常用的通信方法即可  

## 1. status/getters/mutations/action/modeles

***1.1 status***

- Vuex 使用单一状态树，即每个应用将仅仅包含一个store实例，单单一个状态树和模块化并不冲突。存放的数据状态，不可能直接修改里面的数据。
- state就是数据存放地，对应于一般vue对象的data；
- state里存放的数据是响应式的，vue组件从store中读取数据，若是store中的数据发生改变，依赖这个数据的组件也会发生更新；
- 通过mapState把全局的state和getters映射到当前组件的computed计算属性中；

***1.2 getters***

- 实时监听state值的变化
- getters 可以对state进行计算操作，可以理解为state的计算属性，在组件中使用$store.getters.fun()；
- 虽然在组件内也可以做计算属性，但是getters 可以在多个组件之间复用；
- 如果一个状态只是在一个组件内使用，是可以不用getters

***1.3 mutations***

- mutations 定义改变state初始值得方法。
- 在 commit 时会给里面的方法传入参数state或额外的参数，利用vue的双向数据驱动进行值得改变；
- 在组件中使用 this.$sotre.commit('mutations中定义的方法','修改的值')；

***1.4 action***

- 是一个对象变量，最大作用就是里面的Action方法可以包含任意异步操作；
- 这里的异步方法用来异步触发 mutation 里的方法
- action 里面定义的函数接收一个context参数和要变化的形参，context与store实例具有相同的方法和属性，所以可以执行 context.commit('');

```js
// action使用：
//自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
const actions = {
    hideFooter(context) {  
        context.commit('hide');  // hide则是在mutation中定义的方法
    },
    getNewNum(context,num){   // num为要变化的形参
        context.commit('newNum',num)
     }
};

// 在外部触发：
this.$store.dispatch('hideFooter')
this.$store.dispatch('getNewNum', '要变化的参数')
```

***1.5 modeles***

- 项目特别复杂时，可以让每一个模块拥有自己的state，mutation，action，getters，使得结构非常清晰，方便管理
- mapState, mapActions, mapGetters的使用

```js
// store.js
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'
import LoginStatus from './LoginStatus'
Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  state: {
    LoginMsg: '等待登录'
  },
  modules: {  // 模块化部分
    LoginStatus
  }
})

// LoginStatus.js
const state = {
  title: '',    //初始化title
  actionMsg: '',//初始化actionMsg
};

const getters = {
  title(state) {            //承载变化的title
    return state.title;
  },
  actionMsg(state) {
    return state.actionMsg
  }
};

const mutations = {
  setTitle(state, val) {    //如何变化 title
    state.title = val
  },
  setActionMsg(state, val) {
    state.actionMsg = val;
  }
};

const actions = {
  MdyActionMsg(context, val) {  // 触发mutations里面的setActionMsg ,传入数据形参val 对应到val
    context.commit('setActionMsg', val);
  }
};

export default {
  namespaced: true, // 用于在全局引用此文件里的方法时标识这一个的文件名
  state,
  getters,
  mutations,
  actions
}

// login.vue
<script>
import {mapState, mapActions, mapGetters } from 'vuex'
  export default {
    data() {
      return {
        ruleForm: {
          account: 'admin',
          Pass: '123456',
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const msg = '欢迎登录...'
            this.$store.commit('SetLoginMsg', msg)
            this.$store.commit('LoginStatus/setTitle','vuex modules');  // title没有actions，就用commit 触发 LoginStatus.js模块里的 mutation的方法
            this.$store.dispatch('LoginStatus/MdyActionMsg', '6666')    // title有actions，就用dispacth 触发 LoginStatus.js模块里的 actions的方法
            this.$router.push({name: 'Home', path: '/home'})
          }
        });
      },
    },
    computed:{
      ...mapState({
        title: state => state.LoginStatus.title  //里面定义的title是指 LoginStatus.js 里state的title
      }),
      // ...mapGetters({   // 这里获取的getters的值
      //   title: 'title'  //第一个title是我自定义的只要对应template里,第二个title是对应的LoginStatus.js里的getters里的
      // }),
      ...mapActions('LoginStatus',[ //LoginStatus是指的LoginStatus.js
          'MdyActionMsg'            //LoginStatus.js文件中的actions里的方法
      ])
    }
  }
</script>
```

***1.6 不用vuex的影响分析***

```md
- 可为何性下降；
- 可读性下降，因为一个组件里的数据，你根本就看不出来是从哪来的；
- 增加耦合，大量的上传派发，会让耦合性大大的增加
- 注： 兄弟组件有大量通信， 建议使用，不管项目大小
```

## 2. vuex流程

***2.1 有actions***

```md
在vue例子中，通过click事件，触发methods中的方法。当存在异步是，而在vuex中需要dispatch来触发actions中方法，actions中的commit可以触发mutation中的方法同步。则直接在组价中commit触发vuex中的mutation中的方法
```

<!-- ![有actions](./../../assets/img/vue-img/vuex-actions.png) -->

***2.2 没有actions***
<!-- ![没有actions](./../../assets/img/vue-img/13893707-46250b82c3161def.webp) -->

## 3. vuex分析

***3.1 vuex注入组件 install方法***

```js
    npm install vuex --save    // 安装
    Vue.use(Vuex)              // vue的插件机制，安装vuex插件
```

***当ues(Vuex)的时候，会调用vuex中的install方法，装在vuex下面的核心代码***

```js
Vue.mixin({
    beforeCreate() {
        if (this.$options && this.$options.store) {
            //找到根组件 main 上面挂一个$store
            this.$store = this.$options.store
            // console.log(this.$store);
        } else {
            //非根组件指向其父组件的$store
            this.$store = this.$parent && this.$parent.$store
        }
    }
})
// 可见，store注入 vue的实例组件的方式，是通过vue的 mixin机制，借助vue组件的生命周期 钩子 beforeCreate 完成的。即 每个vue组件实例化过程中，会在 beforeCreate 钩子前调用 vuexInit 方法。
```

## 4. vuex使用封装

- npm 下载 vuex，在 main 中安装 vuex 插件；
- src 目录下新建 vuex 文件夹，分别创建 actions.js、getters.js、mutations.js、store.js文件；
- main.js 修改 import store 路径；

***4.1 store.js***

```js
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'
Vue.use(Vuex)
export default new Vuex.Store({
  actions,
  getters,
  mutations,
  state: {
    LoginMsg: '等待登录'
  },
})
```

***4.2 getters.js***

```js
export const LoginMsg = (state) => {
  return state.LoginMsg;
}

```

***4.3 mutations.js***

```js
export const SetLoginMsg = (state, val) => {
  state.LoginMsg = val;
}

```

***4.4 actions.js***

```js

```
