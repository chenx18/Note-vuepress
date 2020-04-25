### Vue Node Mysql Vant 项目搭建：
此项目使用 vue-cli 3.x构建: vue vue-vuex vue-router axios Node koa mysql
1. vue 项目构建：
```js
  // 1. 构建：
      vue create name 
  // 2. 安装 vant：
      npm i vant -S
  // 3. 安装 axios：
      npm install axios --save-dev
  // 全局引入vant、axios:
    import Vue from 'vue';
    import Vant from 'vant';
    import 'vant/lib/index.css';
    Vue.use(Vant);
```
2. vue.config配置
```js
// vue.config.js
module.exports = {
  // 基本路径
  publicPath: '/',  
  // outputDir: 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）
  outputDir: 'dist', 
  //用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  assetsDir: "assets",
  //指定生成的 index.html 的输出路径  (打包之后，改变系统默认的index.html的文件名)
  // indexPath: "myIndex.html",

  //默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变)
  filenameHashing: false,
  // eslint-loader 是否使用eslint
  lintOnSave: true,
  /**
   * 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
   *  打包之后发现map文件过大，项目文件体积很大，设置为false就可以不输出map文件
   *  map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
   *  有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
   * */
  productionSourceMap: false,
  // webpack配置
  chainWebpack: () => {},
  // 支持webPack-dev-server的所有选项
  devServer: {
    host: "localhost",
    port: 8066, // 端口号
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
 
    // 配置多个代理
    proxy: {
      "/api": {
        target: 'http://localhost:8088',  // target: 将所有以 /api 为开头的请求转发到 http://localhost:8088/api
        changeOrigin: true,
        pathRewrite: {     // 重写地址。 '^/api': '' 表示将以 /api 开头的请求的地址中的 '/api' 替换为 ''           
          '^/api': ''
        }
      },
    }
  }
 }
 
```
3. vant Rem 适配
```js
// 1. 安装
npm install lib-flexible --save
npm install postcss-pxtorem --save-dev

// 2. 在项目入口文件main.js 中引入lib-flexible
// 注意事项（important）: 由于flexible会动态给页面header中添加<meta name='viewport' >标签，所以务必请把目录 public/index.html 中的这个标签删除！！！
import 'lib-flexible'

// 3. 配置 postcss-pxtorem
// 是一款postcss插件，用于将单位转化为rem
// postcss-pxtorem的配置放在vue-cli3 项目中postcss.config.js中
plugins: {
  'autoprefixer': {
    browsers: ['Android >= 4.0', 'iOS >= 7']
  },
  'postcss-pxtorem': {
    rootValue: 37.5,
    propList: ['*']
  }
}

// 重启项目生效
```