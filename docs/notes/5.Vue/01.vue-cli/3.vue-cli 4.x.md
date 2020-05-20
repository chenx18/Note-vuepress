# Vue-Cli 4.x
  > vue-cli3 和 vue-cli4 创建的项目基本的配置都内置好了，如果需要扩展自定义的配置可以在根目录新建一个vue.config.js去扩展。  
  > [vue-cli 配置参考](https://cli.vuejs.org/zh/config/)
  > [vue-cli4 配置信息](https://hacpai.com/article/1584265563174)  
  > [npm script](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)  

  ```js
    // 注： 更多npm script 可参考 http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html
    console.log('env', process.env.NODE_ENV)  // 环境 development/production
    console.log('argv',process.argv)          // npm 命令中传递参数可在process.argv读取 如：npm run serve 123456

    const path = require('path');
    const config = {
      publicPath:'/',       //部署应用包时的基本 URL
      outputDir: 'dist',    //打包后的目录名称
      assetsDir: "static",  // 静态资源(js、css、img、fonts)目录

      // webpack-dev-server 相关配置
      devServer: {
        open: false,        // 自动打开浏览器
        host: '0.0.0.0',    // 允许外部ip访问
        port: 8008,         // 端口
        https: false,       // 启用https
        overlay: {          // 错误、警告在页面弹出
          warnings: true,
          errors: true
        },
        proxy: {          // 代理
          "/api": {
              target: `http://cs.ep.eichong.com:2482/api`,   // 目标代理接口地址
              changeOrigin: true,                            // 开启代理
              pathRewrite: {
                "^/api": "/"
              }
          }
        }
      },

      lintOnSave: false   // 取消 eslint 验证
    }

    module.exports = config;

  ```