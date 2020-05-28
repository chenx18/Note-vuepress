## React开发环境之前的准备工作
1. 安装nodeJs
```md
注意：安装nodejs稳定版本
```
2. 安装cnpm（替代npm）
```md
地址：http://npm.taobao.org/
安装cnpm:npm install -g cnpm --registry=https://registry.npm.taobao.org
```
3. 安装yarn（替代cpm）
```md
第一种方法：参考官方文档https://yarn.bootcss.com/
第二种方法：cnpm install -g yarn  或者 npm install -g yarn
```
## React开发环境搭建
1. 安装脚手架工具
```md
npm安装： npm install -g create-react-app 
cnpm安装： cnpm install -g create-react-app
```
2. 创建项目
```md
注意：找到项目要创建的目录
create-react-app reactdemo
```
3. 安装sass-loader和node-sass依赖
```md
npm install sass-loader node-sass --save-dev
```
4. 运行项目
```md
npm运行： npm start
yarn运行： yarn start
```
5. 生成项目
```md
npm生成： npm run build
yarn生成： yarn run build
```

## npx
```
npm v5.2引入的一条命令
```