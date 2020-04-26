## 事件对象
1. super 理解
super(props);   //固定写法
```
子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象
```
2. 事件对象(onClick)
语法： onClick={} ;
```js
import React from 'react';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '我是Home组件'，
    }
  }
  run() {
    console.log('我是一个run方法');
  }
  render() {
    <div>
      <button onClick={this.run}>执行方法</button>
    </div>
  }
}
export default Home;
```
##　绑定事件处理函数this的方法
1. 改变this指向的方法（一）
介绍： onClick={this.events.bind(this)} 使用bind改变this指向
```js
import React from 'react';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '我是Home组件'，
    }
  }
  getData() {
    console.log(this.state.msg);
  }
  render() {
    <div>
      <button onClick={this.getData.bind(this)}>执行方法</button>
    </div>
  }
}
export default Home;
```
2. 改变this指向的方法（二）
介绍： 在构造函数中赋值改变
```js
import React from 'react';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '我是Home组件'，
    }
    this.getData = this.getData.bing(this);
  }
  getData() {
    console.log(this.state.msg);
  }
  render() {
    <div>
      <button onClick={this.getData}>执行方法</button>
    </div>
  }
}
export default Home;
```
3. 改变this指向的方法（三）
介绍： 使用箭头函数指定this指向（推荐使用）
```js
import React from 'react';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '我是Home组件'，
    }
  }
  getData=() => {
    console.log(this.state.msg);
  }
  render() {
    <div>
      <button onClick={this.getData}>执行方法</button>
    </div>
  }
}
export default Home;
```
## 绑定事件处理函数改变state值方法
1. 箭头函数改变this，使用setState改变值
```js
import React from 'react';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '我是Home组件'，
    }
  }
  setData=() => {
    this.setState({
      msg: '我已经改变了msg的值'
    })
    console.log(this.state);
  }
  render() {
    <div>
      <button onClick={this.setData}>确定</button>
    </div>
  }
}
export default Home;
```
2. 使用bind改变this指向，并在表达式中传入需要改变的值
```js
import React from 'react';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '我是Home组件'，
    }
  }
  setData=(str) => {
    this.setState({
      msg: str
    })
    console.log(this.state);
  }
  render() {
    <div>
      <button onClick={this.setData.bind(this, '张三','Abby')}>确定</button>

      {/*<button onClick={this.setData.bind(this, '张三')}>确定</button>*/}
    </div>
  }
}
export default Home;
```