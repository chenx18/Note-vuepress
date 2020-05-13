# Vue-Cli 2.x 使用

## 1. 全局安装 vue-cli

```text
  npm install vue-cli -g   //全局安装
  vue --version           //查看版本
```

## 2. 创建

```text
  vue init <template-name> <project-name>
  1. <project-name>：表示项目名称，这个你可以根据自己的项目来起名字。
  2. <template-name>：表示模板名称，vue-cli官方为我们提供了5种模板：
  2.1 webpack-一个全面的webpack+vue-loader的模板，功能包括热加载，linting,检测和CSS扩展。
  2.2 webpack-simple-一个简单webpack+vue-loader的模板，不包含其他功能，让你快速的搭建vue的开发环境。
  2.3 browserify-一个全面的Browserify+vueify 的模板，功能包括热加载，linting,单元检测。
  2.4 browserify-simple-一个简单Browserify+vueify的模板，不包含其他功能，让你快速的搭建vue的开发环境。
  2.5 simple-一个最简单的单页应用模板。
  注： 在实际开发中，一般使用webpack
```

## 3. 安装依赖

```md
  npm install 或 cnpm install
```

## 4. 启动项目

```text
  npm run dev
```

## 5. 打包上线

```md
  # npm run build
  - 自己的项目文件都需要放到 src 文件夹下
  - 项目开发完成之后，可以输入 npm run build 来进行打包工作
  - 打包完成后，会生成 dist 文件夹，如果已经修改了文件路径，可以直接打开本地文件查看
  - 项目上线时，只需要将 dist 文件夹放到服务器就行了。
```

## 6. 目录结构及其对应作用

```text
  ├── build/                      # webpack 编译任务配置文件: 开发环境与生产环境
  │   └── ...
  ├── config/
  │   ├── index.js                # 项目核心配置
  │   └── ...
  ├ ── node_module/               #项目中安装的依赖模块
    ── src/
  │   ├── main.js                 # 程序入口文件
  │   ├── App.vue                 # 程序入口vue组件
  │   ├── components/             # 组件
  │   │   └── ...
  │   └── assets/                 # 资源文件夹，一般放一些静态资源文件
  │       └── ...
  ├── static/                     # 纯静态资源 (直接拷贝到dist/static/里面)
  ├── test/
  │   └── unit/                   # 单元测试
  │   │   ├── specs/              # 测试规范
  │   │   ├── index.js            # 测试入口文件
  │   │   └── karma.conf.js       # 测试运行配置文件
  │   └── e2e/                    # 端到端测试
  │   │   ├── specs/              # 测试规范
  │   │   ├── custom-assertions/  # 端到端测试自定义断言
  │   │   ├── runner.js           # 运行测试的脚本
  │   │   └── nightwatch.conf.js  # 运行测试的配置文件
  ├── .babelrc                    # babel 配置文件
  ├── .editorconfig               # 编辑配置文件
  ├── .gitignore                  # 用来过滤一些版本控制的文件，比如node_modules文件夹
  ├── index.html                  # index.html 入口模板文件
  └── package.json                # 项目文件，记载着一些命令和依赖还有简要的项目描述信息
  └── README.md                   #介绍自己这个项目的，可参照github上star多的项目。
  build/
```
