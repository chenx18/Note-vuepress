# Vue-Router

[Vue-router 学习笔记](https://www.jianshu.com/p/06d08ea39e31)
[Vue-router官方](https://router.vuejs.org/zh/)

***0 原理、1 安装功能、2 router-view、3 router-link、4 router.push、5 router.replace、6 router.go、7路由重定向、 8路由路径携带参数、9路由嵌套、10路由守卫、11组件内守卫、12完整的导航解析流程***

## 0 实现原理

  ***0.1 实现原理***

  ```md
  SPA: 单页应用程序，只有一个完整的页面，在加载页面时，不会加载整个页面，而是只更新指定容器的内容。
  单页应用核心之一，更新视图而不重新请求页面；
  ```

  ***0.2 router、routes、route的区别***

  ```md
    - router: 一般只的是路由实例，如：路由编程式导航的$router.push();
    - routes: 指创建vue-router路由实例的配置项，用来配置多个route路由对象
    - route： 指路由对象。如 this.$route 指的就是当前路由对象
  ```

## 1.Vue-Router基础

***1.1 安装***

```md
+ 1.安装v-router： npm install vue-router  --save-dev  / cnpm install vue-router  --save-dev
+ 2.在app.vue中引用：
    import Vue from 'vue'
    import VueRouter from 'vue-router'
    Vue.use(VueRouter)  // 在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能
+ 3.创建和挂载跟实例
    new Vue({
        router,
        render: h => h(App)
    }).$mount('#app');
+ 4.确定视图加载的位置
    <router-view></router-view>
```

***1.2 功能***

```md
- Vue Router 是Vue.js官方的路由器。和vuejs的核心深度集成，让构建单页应用更容易；
# 功能：
 - 嵌套的路由/视图表
 - 模块化的、基于组件的路由配置
 - 路由参数、查询、通配符
 - 基于Vuejs过渡系统的视图过渡效果
 - 细粒度的导航控制
 - 带有自动激活的CSS class 的链接
 - HTML5 历史模式或 hash 模式，在IE9中自动降级
 - 自定义的滚动条行为
```

***1.3 优点缺点***

```md
 # 优点：
   - 体验好，不需要每次服务器获取全部，快速展现给用户；
 # 缺点：
   - 不利于SEO；
   - 使用浏览器的前进，后退键的时候会重新发送请求，没合理的利用缓存；
   - 单页无法记住之前滚动的位置，无法在前进和后退的时候记住滚动的位置；
```

```js
const routes = [
  {
    path: '/',             // 路径
    component: resolve => require(['@/layout/index'], resolve),    // 懒加载组件方式
    name: 'vue-router',   // 路由名称
    meta: {               // meta元信息
      menuName: 'vue-router',
      name: 'vueRoute',
    },
    redirect: '/index',   // 重定向
    children: [],         // 子路由
  }
]
```

## 2 router-view

> router-view就是一个容器，在构建单页应用时，方便渲染指定路由对应的组件。

```js
// 1. <router-view>属性携带数据
<router-view msg="abc"></router-view>

//2.组件接受参数
<div>
  <h2>我是about组件</h2>
  <P>{{msg}}</P>
</div>
<script>
    export default{
      props:{
        msg:String
      }
    }
</script>
```

## 3 router-link

- 使用 router-link 组件导航
- 通过 to 属性指定链接
- router-link 默认会被渲染成一个 a 标签

```text
# 1. 基础
<router-link to="/helloworld">GO</router-link>

# 2. 传递参数和接收参数
  - 传递:
    <router-link :to="name:'Helloword',params:{worldmsg:'这是要传递的数据'}">传递数据</router>
  - 接收:
    {{$route.params.worldmsg}}

```

## 4 router.push

- router.push方法会向history栈添加一个新记录，导航到不同的 URL。
- 注意：如果提供了 path，params 会被忽略

```js
// 1. 字符串
this.$router.push('home')

// 2. 对象
this.$router.push({path: '/login?url=' + this.$route.path});

// 3. 命名的路由
this.$router.push({ name: 'user', params: { userId: 123 }})
// 接受参数
this.$route.params.userId

// 4. 带查询参数，变成/backend/order?selected=2
this.$router.push({path: '/backend/order', query: {selected: "2"}});

// 5. 设置查询参数
this.$http.post('v1/user/select-stage', {stage: stage})
  .then(({data: {code, content}}) => {
    if (code === 0) {
      this.$router.push({path: '/home'}); // 对象
    }else if(code === 10){
      // 带查询参数，变成/login?stage=stage
      this.$router.push({path: '/login', query:{stage: stage}});
    }
});
// 设计查询参数对象
let queryData = {};
if (this.$route.query.stage) {
  queryData.stage = this.$route.query.stage;
}
if (this.$route.query.url) {
  queryData.url = this.$route.query.url;
}
this.$router.push({path: '/my/profile', query: queryData});

```

## 5 router.replace

- 跟router.push 相似，只是replace不会向history添加新记录，而是替换当前的history记录

```js
// 1.router.push设置replace
this.$router.push({path: '/home', replace: true})

//2. 如果是声明式就是像下面这样写：
<router-link to="..." replace></router-link>

// 3.编程式:
router.replace(location, onComplete?, onAbort?)
```

## 6 router.go

- 参数是个整数，在history记录中向前或者后退多少步，类似window.history.go(n);
  
```js
  // 在浏览器记录中前进一步，等同于 history.forward()
  this.$router.go(1);

  // 后退一步记录，等同于 history.back()
  router.go(-1)

  // 前进 3 步记录
  router.go(3)

  // 如果 history 记录不够用，那就默默地失败呗
  router.go(-100)
  router.go(100)
```

> 注： router.push、 router.replace 和 router.go 跟 window.history.pushState、 window.history.replaceState 和 window.history.go好像， 实际上它们确实是效仿 window.history API 的；

## 7 路由重定向

- 重定向也是通过 routes 配置来完成；
- 重定向的目标可以是一个命名的路由；
- 也可以是一个方法，动态返回重定向目标；

```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: '/b' }
  ]
})

const router = new VueRouter({
  routes: [
    { path: '/a', redirect: { name: 'foo' }}
  ]
})

const router = new VueRouter({
  routes: [
    { path: '/a', redirect: to => {
      // 方法接收 目标路由 作为参数
      // return 重定向的 字符串路径/路径对象
    }}
  ]
})
```

## 8 路由路径携带参数

```md
// 1. 配置路由（布尔 对象 函数模式）
children:[
  {
    path:'/home/message/detail/:id',
    component:MessageDetail
  }
]

// 2. 路由路经
<router-link :to="'/home/message/detail/'+message.id">{{message.title}}</router-link>

// 3. 路由组件中读取请求参数
this.$route.params.id

```

## 9 路由嵌套

- 1.children 子路由配置
  
```js
  {
    path: '/',
    component: resolve => require(['@/layout/index'], resolve),
    name: 'vue-router',
    meta: {
      menuName: 'vue-router',
      name: 'vueRoute',
    },
    redirect: '/index',
    children: [{
      FunId: 0,
      path: '/index',
      component: resolve => require(['@/views/home/home'], resolve),
      name: 'Home',
      meta: {
        FunId: 0,
        menuName: '主页',
        name: 'Home',
        affix: true
      },
      IdPath:"0/",
      Icon: 'vk-home',
      children: []
    }]
  }
```

## 10 路由守卫

> 在路由跳转前做一些验证，比如登录验证，是网站中的普遍需求等，就可以使用路由守卫；

***1. beforEach***

- 全局守卫，参数：to即将进入的目标路由对象， form当前导航正要离开的路由， next执行下一步；
  
```js
    /**
     * @param {to} 将要去的路由
     * @param {from} 出发的路由
     * @param {next} 执行下一步
     */
    router.beforeEach((to, from, next) => {
        document.title = to.meta.title || '卖座电影';
        if (to.meta.needLogin && !$store.state.isLogin) {
            next({
                path: '/login'
            })
        } else {
            next()
        }
    })
```

```js
// 例:
// 列举需要判断登录状态的“路由集合”，当跳转至集合中的路由时，如果“未登录状态”，则跳转到登录页面LoginPage；
// 当直接进入登录页面LoginPage时，如果“已登录状态”，则跳转到首页HomePage；
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',  // 默认进入路由
      redirect: '/home'   //重定向
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/views/Login/login'], resolve)  // 懒加载组件
    },
    {
      path: '/home',
      name: 'home',
      component: resolve => require(['@/views/HomePage'], resolve)
    },
    {
      path: '**',   // 错误路由
      redirect: '/home'   //重定向
    },
  ]
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
  const nextRoute = ['home'];
  let isLogin = global.isLogin;  // 是否登录
  // 未登录状态；当路由到nextRoute指定页时，跳转至login
  if (nextRoute.indexOf(to.name) >= 0) {  
    if (!isLogin) {
      console.log('what fuck');
      router.push({ name: 'login' })
    }
  }
  // 已登录状态；当路由到login时，跳转至home
  if (to.name === 'login') {
    if (isLogin) {
      router.push({ name: 'home' });
    }
  }
  next();
});

export default router;
```

***2.afterEach(少用))***

- 全局后置钩子
- 全局后置钩子与全局前置守卫类似，然后和守卫不同的是，这g个钩子不会接受next函数也不会改变导航本身

***3.beforeEnter（路由独享的守卫）***

- 使用方法与全局守卫相同
- 不同的是：全局守卫可以作用于全局，路由独享守卫只作用于被设置守卫的路由

```js
        //登录模块
        path: '/login',
        component: () => import('@/views/login'),
        beforeEnter: (to, from, next) => {
            if (to.meta.needLogin && !$store.state.isLogin) {
                next({
                    path: '/login'
                })
            } else {
                next()
            }
        }
```

## 11 组件内守卫

> 可以在路由组件内直接定义以下路由导航守卫  
***1.beforeRouterEnter***
  
- 在渲染该组件的对应路由被confirm前调用
- 不能获取组件实例this，因为当守卫执行前，组件实例还没被创建
- 可以通过next获取data中的数据

```js
  data() {
    return {
      name: "Grayly"
    };
  },  
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      alert("hello" + vm.name);
    })
  },
```

***2.beforeRouterUpdate***

- vue-router2.2版本加入的，如果在两个子路由之间跳转，是不会触发beforeRouterLeave的，这导致某些重置操作没地方触发，在之前使用watch，加入这个钩子后，就有了更好的方式
- 在当前路由改变，但改组件被复用时调用

***3.beforeRouteLeave***

- 导航离开该组件的对应路由时期调用
- 可以访问实例 this
  
```js
 beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
```

## 12 完整的导航解析流程

1. 导航被触发
2. 在失活组件里调用离开守卫
3. 调用全局的beforeEach 守卫
4. 在重用组件里调用 beforeRouteUpdata 守卫
5. 在路由配置里调用 beforeEnter
6. 解析异步路由组件
7. 在被激活的组件里调用 beforeResolve 守卫
8. 调用全局的 beforeResolve 守卫
9. 导航被确认
10. 调用全局的 afterEach 钩子
11. 触发 DOM 更新
12. 用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数

## 题目

1. 怎么定义vue-router的动态路由？
   1. 在router目录下的index中
2. 怎么获取传过来的动态参数？
   1. 对path属性加上 /:id ,使用router对象的params.id获取。
3. vue-router有哪几种钩子导航钩子？
   1. 三种：
   2. 一种全局导航钩子 beforeEarch(to,from,next) 作用跳转前进行判断拦截
   3. 组件内的钩子
   4. 单独路由独享组件
