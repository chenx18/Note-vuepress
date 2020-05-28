## React-router v4
[react-router 官方文档](https://reacttraining.com/react-router/web/example/basic)
#### 一、 Router 了解
> 目前react-router 已经更新到 4+ 版本,在4.0 版本 以后，可以说是react-router-dom 是对react-router 更新出来的部分。提供了对dom 类操作的组件，Link 以及 BrowserRouter
1. react-router: 实现了路由的核心功能；
2. react-router-dom: 基于react-router，加入了在浏览器运行环境下的一些功能；
3. react-router-native: 基于react-router，类似react-router-dom，加入了react-native运行环境下的一些功能。
4. 因为react-router-dom依赖react-router，所以我们使用npm安装依赖的时候，只需要安装相应环境下的库即可，不用再显式安装react-router。基于浏览器环境的开发，只需要安装react-router-dom；基于react-native环境的开发，只需要安装react-router-native。npm会自动解析react-router-dom包中package.json的依赖并安装。
#### 二、安装、引入
```md
安装： cnpm install react-router-dom --save
引入： import { BrowserRouter as Router, Route, Link } from "react-router-dom";
```
------------------------------
#### 三、API介绍
1. **BrowserRouter**
  <BrowserRouter> 使用 HTML5 提供的 history API (pushState, replaceState 和 popstate 事件) 来保持 UI 和 URL 的同步。
1. **HashRouter**
1. **Link**
1. **NavLink**
1. **Prompt**
1. **MemoryRouter**
1. **Redirect**
1. **Route**
1. **Router**
1. **Switch**
-----------------------------
#### 三、配置路由
注：加载的组件需提前引入
```js
<Router>

  <Link to="/">首页</Link>
  <Link to="/news">新闻</Link>
  <Link to="/product">商品</Link>

  <Route exact path="/" component={Home} />
  <Route path="/news" component={News} />    
  <Route path="/product" component={Product} /> 

</Router>
// exact表示严格匹配
```
-----------------------------
#### 四、路由组件之间跳转/传参方式
1. 方法一 (通过query)
```js
// Link（HTML）：
  <Link to={{ pathname: ' /user' , query : { day: 'Friday' }}}>

// JS（接收页面获取传参必须写在生命周期函数中）
  传递页面：this.props.history.push({ pathname : '/user' ,query : { day: 'Friday'} })
  接收页面：this.props.location.query.day
```
2. 方法二 ：
> 同query差不多，只是属性不一样，而且state传的参数是加密的，query传的参数是公开的，在地址栏
```js
// Link（HTML）：
  <Link to={{ pathname : ' /user' , state : { day: 'Friday' }}}> 

// JS（接收页面获取传参必须写在生命周期函数中）
  传递页面：this.props.history.push({ pathname:'/user',state:{day : 'Friday' } })
  接收页面: this.props.location.state.day
```

#### 五、完整代码
```js
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from './components/Home';

import Pcontent from './components/Pcontent';

import './assets/css/index.css'

class App extends Component {

  render() {
    return (

      <Router>
        <div>
             
          <Route exact path="/" component={Home} />
          <Route path="/pcontent/:id" component={Pcontent} />
         
        </div>
      </Router>
    );
  }
}

export default App;
```