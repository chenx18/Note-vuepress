const navConfig = require('../../config/navConfig.js');
const sidebarConfig = require('../../config/sidebar.js');

module.exports = {

  // 页签标题 
  title: '会飞的咸鱼',

  // meta 中的描述文字，意义不大，SEO用
  description: '少年壮志当凌云 仗剑携酒江湖行',

  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    //自定义的 favicon
    ['link', {rel: 'icon',href: '/img/favicon.ico'}],
    //移动端优化
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }] 
  ],

  // 这是部署到github相关的配置
  base: '/',

  // markdown相关配置
  markdown: {
    lineNumbers: true // 代码块显示行号
  },

  // 端口
  port: 8081,

  // 使用默认主题，并做相关配置
  themeConfig: {
    logo: '/img/logo.png',
    nav: navConfig, //导航栏
    sidebar: sidebarConfig, //侧边栏
    sidebarDepth: 3, //最大的深度为 2，它将同时提取 h2 和 h3 标题
    // sidebar: 'auto', // 侧边栏配置
  }
}