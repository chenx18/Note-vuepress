# Vue-Cli 3.x （Vue-Cli安装、项目创建配置、vue.config配置、端口配置、代理配置、安装element）

> 如果你已经安装了vue2.9.6的话，需要先将其删除，删除命令：npm uninstall -g vue-cli  
> 删除成功，Vue CLI 需要 Node.js 8.9 或更高版本，所以在安装新的脚手架的时候先检查下node的版本，命令行中输入：node -v即可看到。

## 1. 安装vue-cli 3.0

```text
  npm install -g @vue/cli
  # or
  yarn global add @vue/cli

  vue -V  //安装成功后查看版本
```

## 2.创建项目

```md
  # vue create <project-name>
  1. <project-name>：表示项目名称，这个你可以根据自己的项目来起名字。

  2. 模板：
  2.1 my-default 是 我原来保存好的模板；
  2.2 default 是 使用默认配置
  2.3 Manually select features 是 自定义配置
```

## 3. 选择配置（自定义配置）

<!-- ![RUNOOB 图标](./../../assets/img/vue-img/2018101914002826.png) -->

## 4. 选择css预编译，这里我选择less

```text
  Please pick a preset: Manually select features
  Check the features needed for your project: Router, Vuex, CSS Pre-processors, Linter, Unit
  Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default):
  SCSS/SASS
  > LESS
  Stylus
```

## 5. 语法检测工具，这里我选择ESLint + Standard config

```text
Please pick a preset: Manually select features
 Check the features needed for your project: Router, Vuex, CSS Pre-processors, Linter, Unit
 Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Stylus
 Pick a linter / formatter config: (Use arrow keys)
 ESLint with error prevention only
 ESLint + Airbnb config
> ESLint + Standard config
 ESLint + Prettier
```

## 6. 选择语法检查方式，这里我选择保存就检测

```text
Please pick a preset: Manually select features
 Check the features needed for your project: Router, Vuex, CSS Pre-processors, Linter, Unit
 Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Stylus
 Pick a linter / formatter config: Prettier
 Pick additional lint features: (Press <space> to select, <a> to toggle all, <i> to invert selection)
>( ) Lint on save // 保存就检测
 ( ) Lint and fix on commit // fix和commit时候检查

```

## 7. 接下来会问你把babel,postcss,eslint这些配置文件放哪，这里随便选，我选择放在独立文件夹

```text
Please pick a preset: Manually select features
 Check the features needed for your project: Router, Vuex, CSS Pre-processors, Linter, Unit
 Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Stylus
 Pick a linter / formatter config: Prettier
 Pick additional lint features: Lint on save
 Pick a unit testing solution: Jest
 Where do you prefer placing config for Babel, PostCSS, ESLint, etc.? (Use arrow keys)
> In dedicated config files // 独立文件放置
 In package.json // 放package.json里
```

## 8. 键入N不记录，如果键入Y需要输入保存名字，如第一步所看到的我保存的名字为my-default

```text
Please pick a preset: Manually select features
Check the features needed for your project: Router, Vuex, CSS Pre-processors, Linter, Unit
Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Stylus
Pick a linter / formatter config: Prettier
Pick additional lint features: Lint on save
Pick a unit testing solution: Jest
Where do you prefer placing config for Babel, PostCSS, ESLint, etc.? In dedicated config files
Save this as a preset for future projects? (Y/n) // 是否记录一下以便下次继续使用这套配置。
```

## 9. 确定后，等待下载依赖模块

## 10. 运行项目

> run serve

## 11. vue.config配置

[vue-cli3的配置参考]([链接地址](https://blog.csdn.net/wo_921110/article/details/94549554))  
> 与vue2.0项目结构有些不同，没有了build和config文件夹，官方文档上面说想要配置的话，需要在项目根目录下创建一个vue.config.js文件  
> vue.config.js 是一个可选的配置文件，如果项目的 (和 package.json 同级的) 根目录中存在这个文件，那么它会被 @vue/cli-service 自动加载。

```js
module.exports = {
//   // 基本路径 (构建好的文件输出到哪里)
//   baseUrl: '/',

  //   // 输出文件目录
  outputDir: 'dist', // 默认dist// 用于嵌套生成的静态资产（js,css,img,fonts）目录

  //   // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  assetsDir: 'assets',

  //   // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径
  //   indexPath: 'index.html', // Default: 'index.html'

  //   // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变)
  filenameHashing: false,

  //   // 构建多页时使用
  //   pages: undefined,

  //   // eslint-loader eslint-loader是否在保存的时候检查 使用带有浏览器内编译器的完整构建版本/
  lintOnSave: false,

  //   // 是否使用包含运行时编译器的Vue核心的构建
  //   runtimeCompiler: false,

  //   // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来
  //   transpileDependencies: [],

  //   // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  //   //  打包之后发现map文件过大，项目文件体积很大，设置为false就可以不输出map文件
  //   //  map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
  //   //  有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
  productionSourceMap: false,

  //   // vue-loader 配置项
  //   vueLoader: {},

  //   // 生产环境是否生成 sourceMap 文件
  //   productionSourceMap: true,

  //   // css相关配置
  //   css: {
  //     // 启用 CSS modules for all css / pre-processor files.
  //     modules: false,
  //     // 是否使用css分离插件 ExtractTextPlugin
  //     extract: true,
  //     // 开启 CSS source maps?
  //     sourceMap: false,
  //     // css预设器配置项
  //     loaderOptions: {},
  //   },

  //   构建时开启多进程处理 babel 编译
  parallel: require('os').cpus().length > 1,

  // PWA 插件相关配置
  pwa: {},

  //   // webpack配置
  //   chainWebpack: config => { },

  // webpack-dev-server 相关配置
  devServer: {
    host: 'localhost',
    open: true, //配置自动启动浏览器
    port: 8080, // 端口号
    https: false, // https:{type:Boolean}
    hotOnly: false,
    proxy: null, // 配置跨域处理,只有一个代理
    // proxy: { // 配置多个代理
    //   "/zte-crm-ccs-core": {
    //     target: 'http://ccsesm.zte.com.cn/',    //后端某个人接口
    //     pathRewrite: {
    //       '^/zte-crm-ccs-core': '/zte-crm-ccs-core'
    //     },
    //     ws: true,   // 如果要代理 websockets
    //     changeOrigin: true
    //   },
    //   "/zte-crm-ccs-datasourceinfo": {
    //     target: 'http://ccsesm.zte.com.cn/',
    //     pathRewrite: {
    //       '^/zte-crm-ccs-datasourceinfo': '/zte-crm-ccs-datasourceinfo'
    //     },
    //     ws: true,
    //     changeOrigin: true
    //   },
    // },
    before: app => {}
  },

  // 第三方插件配置
  pluginOptions: {
    // ...
  }
}

```

## 12. 修改端口

> 我们要修改端口，则只需配置 devServer 选项即可  

```js
module.exports = {
 devServer: {
  host: '0.0.0.0',
  port: 8899,
 }
}
```

## 13. 代理配置

> 通过vue.config.js这个配置文件中的devServer.proxy这个对象进行配置，其中devServer.proxy指向一个开发环境下的服务器API地址  

```js
module.exports = {
  baseUrl : "./",//配置打包时的相对路径
  devServer: {
    port: "8081",//代理端口
    open: false,//项目启动时是否自动打开浏览器，我这里设置为false,不打开，true表示打开
    proxy: {
      '/admin': {//代理api
        target: "http://localhost:8080/account/admin",//服务器api地址
        changeOrigin: true,//是否跨域
        ws: true,  // 是否启用websockets
        pathRewrite: {//重写路径
          "^/admin": ''
        }
      }
    }
  }
}

// 在请求中使用
// '/admin'等于'http://127.0.0.1:8081/admin'
// 此时请求地址为'http://127.0.0.1:8081/admin/picture?method=upload'
// get('/admin/picture?method=upload')
```

## 14. vue-cli3安装element

- 14.1) 安装： vue add element

```js
? How do you want to import Element?      // 如何导入元素
  Fully import  // 全局导入
? Do you wish to overwrite Element's SCSS variables?   // 是否覆盖元素的SCSS变量
  Yes
? Choose the locale you want to load    // 选择要加载的区域设置
  zh-CN
```

- 引入：

```js
// main.js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element.js'

Vue.config.productionTip = false
Vue.use(Element);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

```
