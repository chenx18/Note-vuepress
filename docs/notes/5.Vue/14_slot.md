# 插槽

[slot 废弃前](https://blog.csdn.net/weixin_41646716/article/details/80450873)
[新版slot](https://segmentfault.com/a/1190000018441566?utm_source=tag-newest#articleHeader0)

## 简介

- 子组件定义槽，可以将父组件的html内容放到子组件中显示
- 父页面在组件标签内插入任意内容,子组件内插糟slot控制摆放位置

## 插槽三大分类

1. 匿名插槽(也叫默认插槽): 没有命名,有且只有一个
2. 具名插槽: 相对匿名插槽组件slot标签带name命名的
3. 作用域插槽: 子组件内数据可以被父页面拿到(解决了数据只能从父页面传递给子组件)

## v-slot（vue 2.6更新后）

- vue 2.6版本后废弃原来的slot、slot-scope，但原来的slot也不影响使用；
- vue 2.6版本更新成 v-slot，简写 #slot；

***1. v-slot***

```md
// index.vue (父组件)
<template>
  <div>
    <div class="father">
      <h3>父组件</h3>
      <slotChild>
        <!--匿名插槽 -->
        <!--default对应的默认槽，就是没命名的槽-->
        <template v-slot:default>
            <p>匿名插槽 2.6更新 </p>
        </template>
        <!-- 具名插槽 -->
        <!-- 给 <slot> 元素指定一个 name 后可以分发多个内容, 具名插槽 可以与 匿名插槽 共存 -->
        <template v-slot:header>
            <p >具名插槽 2.6更新 </p>
        </template>
        <!-- 作用域插槽 -->
        <template v-slot:footer="data">
          <div class="tmpl">
            <span v-for="(item,index) in data.data" :key="index">{{item}}</span>
          </div>
        </template>
      </slotChild>
    </div>
  </div>
</template>
<script>
  import slotChild from './slotChild'
  export default {
    name: 'SLOTS',
    data() {},
    methods: {},
    components: {
      slotChild
    }
  }
</script>
<style lang="scss" scoped>
.father {
  width: 600px;
  height: 600px;
  border: 1px solid red;
}
</style>

// slotChild.vue (子组件)
<template>
  <div>
    <div class="child">
      <h3>子组件</h3>
      <br>
      <!-- 匿名插槽（没有名字就是默认的） -->
      <slot>匿名插槽 默认值</slot>
      <br>
      <!-- 具名插槽 -->
      <slot name="header">具名插槽（header）默认值</slot>
      <br>
      <!-- 具名插槽 -->
      <slot name="cont">具名插槽（cont）默认值</slot>
      <br>
      <!-- 作用域插槽 -->
      <slot name="footer" :data="names">作用域插槽(footer)默认值</slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'slotChild',
    data() {
      return {
        names: ['zhangsan','lisi','wanwu','zhaoliu','tianqi','xiaoba']
      }
    }
  }
</script>
<style lang="scss" scoped>
.child {
  width: 500px;
  height: 500px;
  border: 1px solid #ccc;
  margin: 0 auto;
}
</style>
```

***2. slot、slot-scope***

```md
// index.vue (父组件)
<template>
  <div>
    <div class="father">
      <h3>父组件</h3>
      <slotChild>
        <!-- 匿名插槽 -->
        <div class="tmpl">
          <!-- 此处的 ‘匿名插槽 2.6 版本前’ 将会替换 slotChild 组件内的 slot-->
          <p> 匿名插槽 2.6 版本前 </p>
        </div>
        <div>没有槽属性的HTML模板默认关联匿名插槽</div>
        <!-- 具名插槽 -->
        <!-- 给 <slot> 元素指定一个 name 后可以分发多个内容, 具名插槽 可以与 匿名插槽 共存 -->
        <div slot='header'>具名 Slot分发</div>
        <!-- 作用域插槽 -->
        <div slot='footer' slot-scope="data">
          <div class="tmpl">
            <span v-for="(item,index) in data.data" :key="index">{{item}}</span>
          </div>
        </div>
      </slotChild>
    </div>
  </div>
</template>
<script>
  import slotChild from './slotChild'
  export default {
    name: 'SLOTS',
    data() {},
    methods: {},
    components: {
      slotChild
    }
  }
</script>
<style lang="scss" scoped>
.father {
  width: 600px;
  height: 600px;
  border: 1px solid red;
}
</style>

// slotChild.vue (子组件)
<template>
  <div>
    <div class="child">
      <h3>子组件</h3>
      <br>
      <!-- 匿名插槽（没有名字就是默认的） -->
      <slot>匿名插槽 默认值</slot>
      <br>
      <!-- 具名插槽 -->
      <slot name="header">具名插槽（header）默认值</slot>
      <br>
      <!-- 具名插槽 -->
      <slot name="cont">具名插槽（cont）默认值</slot>
      <br>
      <!-- 作用域插槽 -->
      <slot name="footer" :data="names">作用域插槽(footer)默认值</slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'slotChild',
    data() {
      return {
        names: ['zhangsan','lisi','wanwu','zhaoliu','tianqi','xiaoba']
      }
    }
  }
</script>
<style lang="scss" scoped>
.child {
  width: 500px;
  height: 500px;
  border: 1px solid #ccc;
  margin: 0 auto;
}
</style>
```
