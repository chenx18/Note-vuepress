## react路由（Router）

##### 官方文档 
https://reacttraining.com/react-router/web/example/basic

##### 安装
```md
cnpm install react-router-dom --save
```
##### 根组件引入react-router-dom
```md
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
```
##### 配置路由
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
##### 动态路由传值
1. 动态路由配置
```md
<Route path="/content/:aid" component={Content} />   
```
2. 对应的动态路由加载的组件里面获取传值
```md
this.props.match.params
跳转：<Link to={`/content/${value.aid}`}>{value.title}</Link>
```
3. get传值 
```md
获取 this.props.location.search
```
##### 完整代码
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