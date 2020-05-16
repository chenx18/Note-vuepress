# vue 总结

#### mvvm mvc是什么区别 原理
<details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  - MVC（Model-View-Controller）
    - MVC是比较直观的架构模式，用户操作->View（负责接收用户的输入操作）->Controller（业务逻辑处理）->Model（数据持久化）->View（将结果反馈给View）

  - MVVM（Model-View-ViewModel）
    - 是将 **数据模型数据双向绑定** 的思想作为核心，因此在View和Model之间没有联系，通过ViewModel进行交互，
    - 而且 Model 和 ViewModel 之间的交互是双向的，因此视图的数据的变化会同时修改数据源，而数据源数据的变化也会立即反应view。

  - mvc和mvvm其实区别并不大。都是一种设计思想。
    - 主要就是mvc中Controller演变成mvvm中的viewModel。
    - mvvm主要解决了mvc中大量的DOM 操作使页面渲染性能降低，加载速度变慢，影响用户体验。

  - 区别：vue数据驱动，通过数据来显示视图层而不是节点操作。

  - 场景：数据操作比较多的场景，更加便捷

</details>

####  react和vue有哪些不同，说说你对这两个框架的看法
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

- vue-router有两种传参方式 
- vue的生命周期
- 组件通信
- vue同级组件间怎么传值
- vue中父组件如何获取子组件的属性和方法
- computed和watch的区别
- v-show和v-if指令的共同点和不同点
- v-if和v-for一起使用的弊端以及解决办法
- vue中的事件修饰符主要有哪些？分别是什么作用
- 介绍下什么是keep-alive
- vue中如何解决页面不重新渲染问题
- vuex是什么？怎么使用？哪种功能场景使用它？
- vuex有哪几种属性？

[2020前端最新面试题（vue篇）](https://blog.csdn.net/weixin_45325238/article/details/104968195?utm_medium=distribute.pc_relevant_right.none-task-blog-BlogCommendFromMachineLearnPai2-2.nonecase&depth_1-utm_source=distribute.pc_relevant_right.none-task-blog-BlogCommendFromMachineLearnPai2-2.nonecase)