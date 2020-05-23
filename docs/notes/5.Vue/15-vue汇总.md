# vue 总结
  [2020 Vue经典面试题](https://blog.csdn.net/MingL520/article/details/106014105)      
  [Vue常见面试题总结 必看](https://zhuanlan.zhihu.com/p/97950650)  
  [2020年，vue面试遇到的问题](https://zhuanlan.zhihu.com/p/103763164)  
  [Vue常见面试题总结](https://zhuanlan.zhihu.com/p/97950650)  

  - vue 两个核心： 数据驱动： ViewModel，保证数据和视图的一致性；组件化

#### 目录
<details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  - mvvm mvc 核心
  - Object.defineProperty()
  - 虚拟dom
  - 生命周期
  - 组件通信
  - computed 、getter和setter
  - watch
  - 重置data  ->Object.assign() 
  - 定义全局方法 -> Vue.prototype.方法名称
  - this.$set
  - this.$nextTick
  - v-model
  - v-for key
  - v-if / v-show / v-html / v-bind/v-on
  - 自定义指令及生命周期
  - 强制刷新组件 ① v-if ② this.$forceUpdate
  - 首页的加载速度
  ------------------------------------------
  - router route 
  - active-class route-link
  - keep-alive
  - 跳转 传参
  - 钩子守卫 动态加载路由 响应路由参数的变化
  --------------------------------------------
  - vuex、属性
  ----------------------------------------------------------------
  - axios、特点、拦截器、比较

</details>


#### mvvm mvc是什么区别 原理
<details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  - MVC（Model-View-Controller）
    - 视图（view）、模型（Model）、控制器（controller）
    - View 传送指令到 Controller,Controller 完成业务逻辑后，要求 Model 改变状态,Model 将新的数据发送到 View，用户得到反馈
    - 所有通信都是单向的。
  ![mvc](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015020105.png "mvc")   
  
  - MVVM（Model-View-ViewModel）
    - model 代表数据层； view 代表视图层； ViewModel 主要负责同步 model 和 view 的对象，保证视图和数据的一致性,也就实现双向数据绑定
  ![mvvm](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015020110.png "mvvm")  

  - mvc和mvvm其实区别并不大。都是一种设计思想。
    - mvc 是一个单向数据通信； mvvm是一个双向数据绑定模式
    - 主要就是mvc中Controller演变成mvvm中的viewModel。
    - mvvm主要解决了mvc中大量的DOM 操作使页面渲染性能降低，加载速度变慢，影响用户体验。

  - 区别：vue数据驱动，通过数据来显示视图层而不是节点操作。

  - 场景：数据操作比较多的场景，更加便捷

</details>

#### Vue的原理
<details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  - vue 使用的 **m-v-vm** 模式，通过 **modelView** 作为中间层，进行双向数据的 绑定 与 变化；
  1. 通过建立虚拟 dom 树 **document.createDocumentFragment()** 方法创建虚拟 dom 树
  2. 一旦被监测的数据发生变化， 会通过 **Object.defineProperty()** 定义的数据拦截，截取到数据的变化
  3. 截取到的数据变化，通过订阅--发布模式，触发 Watcher (观察者)，从而改变虚拟 dom 中的具体数据
  4. 最后通过更新虚拟dom元素的值，改变最后渲染的 dom 树，完成双向绑定

  mvc 数据视图控制器 视图发送指令 ->控制逻辑，修改数据 -> 数据发送给视图 单向通信  
  mvvm 数据视图 viewmodel 负责同步数据视图对象 保证一致 实现的是一个双向的通信  
  主要是通过 数据劫持和发布订阅模式 实现的数据视图一致  
  核心方法是用ES5 的 object.defineProperty() 劫持各个属性的 set get方法
  当某个数据有变化时，发布消息给订阅者，然后触发相应的监听回调 

</details>



#### vue 解决页面不重新渲染问题(this.$set)
<details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  - 修改对象属性后页面未重新渲染可以使用 this.$set(对象名称, '属性名', '属性值')
  - 使用this.$forceUpdate()方法可重新渲染页面

</details>

#### nextTick 作用、实现原理
<details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  - $nextTick 会在DOM渲染之后被触发，以获得最新Dom
  - 页面渲染时会将 data 的修改做整合，多次 data 修改只会渲染一次 
  - [Vue.nextTick 的原理和用途](https://segmentfault.com/a/1190000012861862)

</details>


#### computed
<details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  - 是一个计算属性，类似于过滤器，**对绑定到view的数据进行处理**；可用于简化tempalte里面{{}}计算，处理 props 或者 $emit 的传值；
  - **有get 和 set 属性，不需要在data里声明**
  - **具有缓存性**；如果 页面重新渲染 值不变化，计算属性会立即返回之前的计算结果，而不必再次执行函数；

</details>

#### Watch
<details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  
  - Watch 是一个**观察的动作**，可以监听模型变量的变化。可用于监听 props，$emit，vuex 或 本组件的值 执行异步操作
  - Watch 是一个**对象**，以键值对形式出现；值可以是函数，也可以是匿名函数； 
  - 可以进行 **深度监听**, 
  - **无缓存性**，页面重新渲染时值不变化也会执行

  - 值是包括选项的对象：选项包括有三个。
    - handler: 是一个**回调函数，监听变化时应执行的函数**；
    - deep：**是否深入监听**。deep 的意思就是深入观察，监听器会一层层的往下遍历，给对象的所有属性都加上或则个监听器；
    - immediate: 表示在 watch 中 **首次绑定的时候，是否执行handler**，值为true则表示在watch中声明的时候，就立即执行handler方法，值为false，则和一般使用watch一样，在数据发生变化的时候才执行handler。

</details>

#### v-html 会导致哪些问题
<details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

 - 会有xss分险，会覆盖子元素
 - v-html 更新的是元素的 innerHTML。 内容按照普通 HTML 插入，不会做为vue 模板进行编译
 - 在单文件组件里，scoped 的样式不会应用在v-html 内部，因为那部分 HTML 没有被 vue 的模板编辑器处理。如果你希望针对 v-html 的内容设置带作用域的 css， 你可以替换为 css Modules 或用过一个额外的全局

</details>

#### v-for key的作用
<details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  - 当用v-for 更新一渲染过的元素列表时， 默认用 "就地复用" 策略。
    - 如果数据项的顺序被改变，vue将不是移动 DOM 元素来匹配数据项的改变，而是简单复用此处每个元素，并确保它在特定索引下显示已被渲染过的每一个元素
  - 使用key来给每个节点做一个唯一标识，更高效的更新虚拟DOM
  - [Vue2.0 v-for 中 :key 到底有什么用？](https://www.cnblogs.com/zhumingzhenhao/p/7688336.html)
 
</details>

#### v-show 和 v-if指令的共同点和不同点
<details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  - v-if & v-show 用于隐藏和显示元素
  - 区别在于
    - v-show 是 css 的切换，修改 display:block|none；
    - v-if 是把元素从dom中删除或者创建 （false 不渲染）
  
</details>

#### v-if 和 v-for 一起使用的弊端以及解决办法
<details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  - v-for 优先级比 v-if 高，导致每循环一次就会去 v-if 一次，而 v-if 是通过创建和销毁dom元素来控制元素显示与隐藏，所以会不停的去创建和销毁元素，造成页面卡顿，性能下降；
  - 解决办法：在 v-for 的外层或内层包裹一个元素来使用 v-if

</details>

#### vue 中的事件修饰符主要有哪些？分别是什么作用
<details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  修饰符 | 作用
  |:--:|--|
  .stop | 阻止事件冒泡
  .native | 绑定原生事件
  .once | 事件只执行一次
  .self | 事件绑定在自身身上，相当于阻止事件冒泡
  .prevent | 阻止默认事件
  .caption | 用于事件捕获

</details>

#### vue 的生命周期
<details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  - 总共分8个阶段: 创建前/后，载入前/后，更新前/后，销毁前/后
    - **创建前/后**： 
      - **beforeCreate** 阶段，vue 实例的挂载元素 $el 和数据对象 data 都为 understand，还未初始化。
      - **created 阶段**，实例创建完成之后调用。实例已经完成 数据观测(dataobserver), 属性和方法运算， watch/event事件回调，还没有$el;
    - **载入前/后**
      - **beforeMount** 阶段：虚拟DOM已创建完成，在数据渲染前最后一次更改数据
      - **mounted** 阶段：vue 实例挂载完成 data成功渲染
    - **更新前/后**
      - data 变化时  会触发 beforeUpdate 和 updated 方法，不常用 不推荐使用；
    - **销毁前/后**
      - **beforeDestory** 在vue实例销毁前触发
      - **destroyed** 在实例销毁后触发
      
  - 父子组件生命周期
    - 加载渲染过程：  
      父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted
    - 组件更新过程：   
      父beforeUpdate->子beforeUpdate->子updated->父updated
    - 销毁过程：  
      父beforeDestroy->子beforeDestroy->子destroyed->父destroyed


  ![生命周期图示](https://cn.vuejs.org/images/lifecycle.png "生命周期图示")

</details>

#### ajax 请求放在哪个生命周期中
<details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  - 在 created 的时候，视图中的 dom 并没有渲染出来，所以此时如果直接去操作 dom 节点，无法找到相关的元素
  - 在 mounted 中，由于此时 dom 已经渲染出来了，所有可以直接操作 dom 节点；
  - 因为生命周期是同步执行，ajax 是异步执行，保证逻辑统一性，不被多次调用，一般情况下放在 mounted 中
    - 服务端渲染不支持 mounted 方法，所以在服务端渲染的情况先统一放在 created 中

</details>


#### vue 组件通信
<details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  - **$children**：用来访问子组件实例，是一个数组，可以用foreach分别得到所需要的的数据，但是无法确定子组件的顺序，也不是响应式的。
  - **$refs**: 定义一个ref，这样就可以通过this.$refs获取所需要的的数据
  - **$parent**: 访问父组件实例，通常父组件都是唯一确定的，跟$children类似
  - **props** 父组件向子组件，是一个单向的传递
  - **$emit** 子组件向父组件，子组件使用 $emit() 触发自定义事件，父组件用 &on() 监听，类似观察者模式
  - **中央事件总线Bus** , 在 vue 的原型上添加一个bus属性,之后创建的 vue 实例都具有 bus 这个属性，就可以通过 $bus 进行组件交互
  - 插槽

  > **父子通信** props和$emit基本可以满足， **兄弟组件** 可以用 vuex 或 bus，**跨级** 可以使用 bus 或 vuex 

  ```js
    // $children
    this.$children
    // $ref
    this.$refs.hello.属性
    this.$refs.hello.方法
    // $parent
    this.$parent.属性
    this.$parent.方法
  ```

</details>

#### vue 中父组件如何获取子组件的属性和方法
<details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  - 通过在子组件上定义ref属性来获取子组件的属性和方法
  ```js
    this.$refs.child.属性名（方法名）
  ```

</details>

#### 多个组件有相同逻辑如何抽离（mixin）
<details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  - Mixins是一种分发Vue组件中可复用功能的非常灵活的一种方式。
    - mixin的数据对象和组件的数据发生冲突时以组件数据优先。
  
  - mixin问题：
    - 变量来源不明，不利代码阅读
    - 多mixin 可能造成命名冲突
    - mixin 和组件可能出现多对多的关系，复杂程度高
  

</details>

#### vue-router是什么？有哪些组件？
<details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  - Vue Router 是 Vue.js 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌。
    - router-link、router-view、keep-alive

</details>
  

#### active-class 是哪个组件的属性？
<details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  - active-class是router-link终端属性，用来做选中样式的切换，当router-link标签被点击时将会应用这个样式

</details>


#### vue-router 定义动态路由，获取传值
<details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  - 动态路由的创建，主要是使用path属性过程中，使用动态路径参数，以冒号开头，如下：
    - 访问details目录下的所有文件，如果details/a，details/b等，都会映射到Details组件上。
    - 当匹配到/details下的路由时，参数值会被设置到this.$route.params下，所以通过这个属性可以获取动态参数
  ```js
    // 定义动态路由
    {
      path: '/details/:id'
      name: 'Details'
      components: Details
    }
    // 获取动态路由参数
    console.log(this.$route.params.id)
  ```

</details>

#### vue-router 路由的跳转方式，传参方式 
<details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  - 两种跳转方式：
    - 声明式导航：router-link to
    - 编程式导航： router.push()

  - 两种传参方式
    - Params：只能使用name，不能使用path; 参数不会显示在路径上; 浏览器强制刷新参数会被清空
    ```js
      // 传递参数
      this.$router.push({
        name: Home，
        params: {
          number: 1 ,
          code: '999'
        }
      })
      // 接收参数
      const p = this.$route.params
    ```
    - Query: 参数会显示在路径上，刷新不会被清空; name 可以使用path路径
    ```js
      // 传递参数
      this.$router.push({
        name: Home，
        query: {
        number: 1 ,
        code: '999'
      }
                        })
      // 接收参数
      const q = this.$route.query
    ```

</details>

#### route 、router 、routes的区别
<details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  - router 是一个全局路由对象，包含了路由跳转的方法、钩子函数等  

  - route 是一个路由信息对象，每一个路由都会有一个route对象，是一个局部对象，包含path,params,hash,query,fullPath,matched,name等路由信息参数。

  - routes 创建 vue-router 路由实例的配置项，用来配置多个 route 路由对象

</details>

#### vue-router 路由守卫
<details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  - 完整的导航解析流程
  1. 导航被触发
  2. 在失活的组件里调用离开守卫
  3. 调用全局的 beforeEach 守卫
  4. 在重用的组件里调用 beforeRouteUpdate 守卫
  5. 在路由配置里调用 beforeEnter
  6. 解析异步路由组件
  7. 在被激活的组件里调用 beforeRouteEnted
  8. 调用全局的 beforeResolve 守卫
  9. 导航被确认
  10. 调用全局的 afterEach 钩子
  11. 触发 DOM 更新
  12. 用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数

</details>

#### vue-router有哪几种导航钩子（ 导航守卫 ）
<details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  1. 全局守卫 router.beforeEach
    - to:Route,代表要进入的目标，它是一个路由对象。
    - from:Route,代表当前正要离开的路由，也是一个路由对象
    - next():进入管道中的下一个钩子，必须调用，否则钩子函数无法resolved
  2. 全局解析守卫 router.beforeResolve
  3. 全局后置钩子 router.afterEach
  4. 路由独享的守卫 beforeEnter
  5. 组件内的守卫 beforeRouteEnter、beforeRouteUpdate(2.2 新增)、beforeRouteLeave
  
  vue-router 提供的导航守卫主要用来:通过跳转或取消的方式守卫导航   

  注意：参数或查询的改变并不会触发进入/离开的导航守卫。 你可以通过观察 $route 对象 来应对这些变化，或使用 beforeRouteUpdate的组件内守卫。
  
</details>


#### vue-router响应路由参数的变化
<details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  1. 用watch 检测
  ```js
    // 监听当前路由发生变化的时候执行
    watch: {
      $route(to, from){
        console.log(to.path)
        // 对路由变化做出响应
      }
    }
  ```

  2. 组件内导航钩子函数
  ```js
    beforeRouteUpdate(to, from, next){
      // to do somethings
    }
  ```

</details>

#### vue-router的两种模式
<details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  - 前端路由的核心，就在于——— 改变视图的同时不会向后端发出请求。
  - **hash**
    - 址栏 URL 中带 **#** 符号
    - 特点：hash 虽然出现 URL 中，但不会被包含在 HTTP 请求中，对后端完全没有影响，因此改变 hash 不会重新加载页面。

  - **history**
    - 利用了HTML5 History Interface 中新增的 pushState() 和 replaceState() 方法。（需要特定浏览器支持）
    - 需要后台配置支持。如果刷新时，服务器没有响应响应的资源，会刷出404;
    - history模式下，前端的url必须和实际向后端发起请求的url 一致，如http://www.abc.com/book/id 。如果后端缺少对/book/id 的路由处理，将返回404错误。 

</details>

####  vue-router实现路由懒加载（动态加载路由）
<details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  1. 把不同路由对应的组件分割成不同的代码块，然后当**路由被访问时才加载对应的组件**即为路由的懒加载，可以加快项目的加载速度，提高效率
  ```js
    const router = new VueRouter({
      routes: [
        {
          path: '/home',
          name: 'Home'，
          component:() = import('../views/xxxx')
        }
      ]
    })
  ```
  
</details>

#### 指令 keep-alive
<details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  - 缓存组件；就是可以把切换出去的组件保留在内存中，可以保留它的状态或避免重新渲染。
  - 频繁切换，不需要重复渲染组件

  - keep-alive的生命周期：
    - activated： 页面第一次进入的时候，钩子触发的顺序是created->mounted->activated
    - deactivated:  页面退出的时候会触发deactivated，当再次前进或者后退的时候只触发activated


</details>

#### vuex是什么？怎么使用？哪种功能场景使用它？
<details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  - vuex 是一个专为 vue.js 应用程序开发的**状态管理模式**；相当于一个仓库，仓库里放了很多对象，任何组件都可以存取仓库中的数据；

  - vuex 有五个属性，state，getters，mutations，actions，modules；
    - state: 数据存放地，类似一个仓库  
      - 当 mutation 修改了state的数据的时候，他会动态的去修改所有的调用这个变量的所有组件里面的值
    
    - getters: 实时监听state值的变化，获取数据
    
    - mutations: 提交更改数据的方法，必须是同步函数

    - actions: 可以包含任意异步操作，通过提交 mutation 间接更变状态。

    - modules 模块化vuex，将 store 分割成模块，每个模块都具有state、mutation、action、getter、甚至是嵌套子模块。

  - 使用vuex优势：
    - **多层嵌套的组件、兄弟组件间的状态会更好管理维护**  
    - **数据集中处理更有利程序的稳定和维护**  
    - 缓存一些当前要使用请求远程或者本地的数据集

  - 使用场景： 对于多个组件共享状态时，跨组件共享数据，使用vuex 是不错的选择

</details>

#### action 和 mutation 区别
<details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  - **actions** 最终提交的是 **mutation**,间接改变状态；
  - 因为在vue中，只有 **mutation** 才能正真改变 VUEX stroe 中的 state；
  - actions 最大的作用就是可以包含任意的异步操作，如果有异步操作那么就用 action 来提交 mutation

</details>

#### axios
<details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  - **概念**：
    - axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和node中；
  
  - **特点**： 
    - 是一个基于 promise 的 HTTP 库，支持 promise 所有的 api
    - 支持请求／响应拦截器
    - 可以转换请求数据和响应数据，并对响应内容自动转换成 JSON 类型数据
    - 安全性高，客户端支持 XSRF

  - **有两个拦截器**
    - request 请求拦截器， 在请求发送前进行一些操作
    - response 响应拦截器， 在接收到响应后进行一些操作

  - **常用方法**：
    - get post put delete 

  - axios**相关配置属性**
    - **url** 用于请求服务器 URL
    - **method** 请求方式
    - **baseURL** 自动加在url前
    - **transformRequest** 允许在向服务器发送前，修改请求数据，只能用在'PUT','POST'和'PATCH'这几个请求方法
    - **headers** 自定义请求头
    - **params** URL参数
    - **auth** 凭据

  - 优缺点：
    1. ***ajax：***
      - 本身是针对MVC编程，不符合前端MVVM的浪潮
      - 基于原生XHR开发，XHR本身的架构不清晰，已经有了fetch的替代方案，jquery整个项目太大，单纯使用ajax却要引入整个jquery非常不合理（采取个性化打包方案又不能享受cdn服务）
      - ajax不支持浏览器的back按钮
      - 安全问题ajax暴露了与服务器交互的细节
      - 对搜索引擎的支持比较弱
      - 破坏程序的异常机制
      - 不容易调试

    2. ***axios：***
      - 从node.js创建http请求
      - 支持Promise API
      - 客户端防止CSRF（网站恶意利用）
      - 提供了一些并发请求的接口
      
</details>

#### SSR/CSR/SPA
<details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  - **SSR**：
    - 定义： 服务器直接生成HTML 文档返回给浏览器，但也没交互能力有限，适合任何后端语言 
    - 优点： 响应速度快，有利SEO；
    - 缺点： 前后端代码混合，不利开发和维护，前后端代码不分离

  - **CSR**
    - 定义： 页面初始加载的HTML 文档中无核心内容，需要执行 js 文件，由浏览器动态生成页面，并通过 js 进行页面交互事件与状态管理
    - 优点:  适合前后端分离开发，方便维护，单页应用中几乎都是客户端渲染
    - 缺点： 首次加载慢， 不利SEO

  - **SPA**：（单页应用程序）
    - 优点：页面盗号不用刷新整个页面，体验好，有利于前后端分离开发
    - 缺点：不利于 seo，因为单页面应用中都是使用客户端渲染方式； 首次加载慢，因为第一次要加载很多资源
      
</details>

#### vue 3.0 有哪些改进

#### react和vue有哪些不同，说说你对这两个框架的看法
<details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  - 相同点
    - 都支持服务器端渲染
    - 都有Virtual DOM,组件化开发,通过props参数进行父子组件数据的传递,都实现webComponent规范
    - 数据驱动视图
    - 都有支持native的方案,React的React native,Vue的weex

  - 不同点
    - React严格上只针对MVC的view层,Vue则是MVVM模式
    - virtual DOM不一样,vue会跟踪每一个组件的依赖关系,不需要重新渲染整个组件树.而对于React而言,每当应用的状态被改变时,全部组件都会重新渲染,所以react中会需要shouldComponentUpdate这个生命周期函数方法来进行控制
    - 组件写法不一样, React推荐的做法是 JSX + inline style, 也就是把HTML和CSS全都写进JavaScript了,即'all in js'; Vue推荐的做法是webpack+vue-loader的单文件组件格式,即html,css,jd写在同一个文件;
    - 数据绑定: vue实现了数据的双向绑定, react数据流动是单向的
    - state对象在react应用中不可变的,需要使用setState方法更新状态;在vue中,state对象不是必须的,数据由data属性在vue对象中管理

</details>




[2020前端最新面试题（vue篇）](https://blog.csdn.net/weixin_45325238/article/details/104968195)

[2020年3月份最新vue面试题汇总一](https://blog.csdn.net/qq_41646249/article/details/104644647)   

[2020年3月份最新vue面试题汇总二](https://blog.csdn.net/qq_41646249/article/details/104644712)  