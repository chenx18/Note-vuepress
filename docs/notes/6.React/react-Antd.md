## Ant Design
##### 介绍
```
服务于企业级产品的设计体系，基于确定和自然的设计价值观上的模块化解决方案，让设计者和开发者专注于更好的用户体验;
官网： https://ant.design/docs/react/introduce-cn；
```
##### React中使用Antd
1. 安装Antd：
```
  npm install antd --save 
  yarn add antd 
  cnpm install antd --save
  根据个人环境喜好挑其一安装就可以
```
2. 引入 Antd的css
```
@import '~antd/dist/antd.css';
注：在根组件引入antd.css文件，本次引入则是把所有的组件都一次引入；
```
3. 使用
```
https://ant.design/docs/react/introduce-cn；
进入官网挑选需要组件，官网内已有实例；
```

##### React中，按需引入css样式Antd
```
我们现在已经把组件成功运行起来了，但是在实际开发过程中还有很多问题，例如上面的例子实际上加载了全部的 antd 组件的样式（对前端性能是个隐患）。
```

1. 安装antd  
```
  npm install antd --save 
  yarn add antd 
  cnpm install antd --save
  根据个人环境喜好挑其一安装就可以
```

2. 安装（react-app-rewired）
```
注：一个对 create-react-app 进行自定义配置的社区解决方案
方法1：yarn add react-app-rewired
方法2：cnpm install  react-app-rewired --save
```

3. 修改 package.json
```js
  // react-scripts 需改为react-app-rewired
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test --env=jsdom",
    "eject": "react-app-rewired eject"
  }
```

4. 安装babel-plugin-import
```
  注: babel-plugin-import是一个用于按需加载组件代码和样式的 babel 插件;
  方法1：yarn add babel-plugin-import
  方法2：cnpm install babel-plugin-import --save
```

5. 在项目根目录创建一个 config-overrides.js 配置文件
```js
const { injectBabelPlugin } = require('react-app-rewired');
module.exports = function override(config, env) {
  config = injectBabelPlugin(
        ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }],
          config,
  );
  return config;
};
```

7. 完成配置
```js
// 注：然后移除前面在 src/App.css 里全量添加的 @import '~antd/dist/antd.css'; 直接引入组件使用就会有对应的css
import { Button } from 'antd';
<Button type="primary">Primary</Button>

```
		



		




	
