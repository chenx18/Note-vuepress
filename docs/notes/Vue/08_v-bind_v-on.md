# vue 文本 v-html/v-bind/v-on/v-if/v-show/v-for/v-model

## 文本

> 使用双大括号 {{}}

## 指令

1. v-html 指令：
   - 输出HTML需要用 v-html指令

    ```html
    <span v-html="rawHtml"></span>
    ```

2. v-bind
   - v-bin主要用于属性绑定，简写 :bind
   - 可响应式更新html

    ```js
        // 完整语法
        <a v-bind:href="url"></a>
        // 缩写
        <a :href="url"></a>
    ```

3. v-on
   - 用于绑定HTML事件，并触发事件函数内部逻辑；v-on:click 简写 @click；
   - Vue.js 为 v-on 提供了事件修饰符
     - .stop
     - .prevent
     - .capture
     - .self
     - .once
     - .passive
  
    ```html
        <!-- 阻止单击事件继续传播 -->
        <a v-on:click.stop="doThis"></a>

        <!-- 提交事件不再重载页面 -->
        <form v-on:submit.prevent="onSubmit"></form>

        <!-- 修饰符可以串联 -->
        <a v-on:click.stop.prevent="doThat"></a>

        <!-- 只有修饰符 -->
        <form v-on:submit.prevent></form>

        <!-- 添加事件监听器时使用事件捕获模式 -->
        <!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
        <div v-on:click.capture="doThis">...</div>

        <!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
        <!-- 即事件不是从内部元素触发的 -->
        <div v-on:click.self="doThat">...</div>
    ```

4. v-if AND v-show
   1. if 和 show都是条件渲染指令，根据不同条件，使用不同的模板生成html；
   2. 区别：
      1. show： 在初始化的时候编译并且渲染，并且在之后一直存在，只是更改css；
      2. if：会在切换条件过程适当地销毁和重建组件元素，只要条件为正才会去重建（惰性）；
   3. 对比：
      1. v-if更消耗性能，它其实是控制DOM的添加和删除，而v-show只是控制css；
      2. 如果需要频繁切换使用v-show比较好，运行条件不大可能改变则用v-if比较好；

5. v-for
   1. v-for用来遍历数组对象渲染列表；
   2. 写法：
      1. v-if="item in items";
      2. 提供第二个的参数键名：
        - v-for="(value, name) in object"；
      1. 提供第三个参数作为索引：
        - v-for="(value, name, index) in object"
   3. key属性：
      1. 在组件中必须用 key 配合 v-for，以便维护内部组件及其子树的状态；
      2. 简单点for更新渲染元素列表的时候，会根据key值去判断某个值是否修改，如果修改就重新渲染，反之复用之前的元素；

    ```text
        // 遍历数组
        <ul id="example-1">
            <li v-for="(item, index) in items" :key="index">
                {{ item.message }}
            </li>
        </ul>
        var example1 = new Vue({
            el: '#example-1',
            data: {
                items: [
                    { message: 'Foo' },
                    { message: 'Bar' }
                ]
            }
        })

        // 遍历对象
        <div v-for="(value, key, index) in object">
            {{ index }}. {{ key }}: {{ value }}
        </div>
        new Vue({
            el: '#v-for-object',
            data: {
                object: {
                    firstName: 'John',
                    lastName: 'Doe',
                    age: 30
                }
            }
        })

        // 遍历整数
        //以下代码结果会渲染出 1,2,3
        <div id="app">
            <ul>
                <li v-for="n in num">{{n}}</li>
            </ul>
        </div>
        new Vue({
            el: '#app',
            data: {
                num: 3
            }
        })
    ```

6. v-if和v-for
   1. 不能一起使用：
      1. v-for比v-if优先，即每一次都需要遍历整个数组，影响速度，所以不能一起使用；
   2. 解决：
      1. 必要情况下应该替换成computed属性，处理好需要遍历的数据；
      2. 把v-if改成v-show

7. v-model(表单输入绑定)
   1. v-model指令在表单元素创建双向数据绑定（input/textarea/select）；
   2. 本质是个语法糖，即绑定了数据，又添加了一个input数据监听；
   3. 当在input元素中使用v-model实现双向数据绑定，其实就是输入的时候触发元素的input事件，通过语法糖，也能实现父子组件数据的双向绑定；
   4. 修饰符：
       - .lazy    在change时更新,而非“input”时更新
       - .number  将用户的输入值转为数值类型
       - .trim    过滤用户输入的首尾空白字符
   5. 父子组件数据的双向绑定：

    ```js
    // **父组件**
    <template>
        <div>
            <input type="text" v-model="message" placeholder="请输入..."/>
            <p>输入的内容是：{{message}}</p>

            <label>
                lazy:
                <input type="text" v-model.lazy="lazy" /> <span>{{lazy}}</span>
            </label>
            <label>
                number11:
                <input type="text" v-model.number="number11" /> <span>{{number11}}</span>
            </label>
            <label>
                trim:
                <input type="text" v-model.trim="trim" /> <span>{{trim}}</span>
            </label>

            <Children v-model="number"></Children>
        </div>
    </template>
    <script>
    import Children from './children.vue'
    export default {
        name: 'App',
        data() {
            return {
                message: '',
                lazy:'',
                number11:1,
                trim:'',
                number:0
            }
        },
        components: {
            Children
        }
    }
    </script>

    // 子组件(children)
    <template>
        <div @click="$emit('input', value+1)"> 子组件 </div>
    </template>
    <script>
    export default {
        name:'Children',
        props:['value'],
        data() {}
    }
    </script>
    //通过v-bind把父组件的数据绑定到了子组件的props属性中，而在props上默认用value取值，然后通过$emit触发事件input，因为v-model绑定的事件是input，故在子组件上触发了父组件的input事件，通过触发事件来进行传值，实现了父子组件数据的双向绑定，相对于直接使用v-bind以及自定义事件代码量有所减少。
    ```
