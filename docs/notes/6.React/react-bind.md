## React super、数据绑定、属性绑定、数据循环、组件命名、Img
##### 1. Super关键字
  1. Es6中的super可以用在类的继承中，super关键字，指代**父类的实例**（即父类的**this**对象）；
  2. 子类必须在constructor方法中调用super方法，否则新建实例时会报错；
  3. 因为子类没有自己的this对象，而是继承父类this对象，然后进行处理；
  4. 如果不调用super方法，子类就得不到this对像
  5. 用在构造函数中，必须在使用this之前调用，用于父子组件传值 ，固定写法
  ```js
  class Student extends Person {
    constructor (props) {
      super(props); // 用在构造函数中，必须在使用this之前调用，用于父子组件传值 ，固定写法
      this.age = age;
    }
	}
  ```

##### 2. 数据绑定 {}
  > 在react中数据绑定是用'{}'符号进行数据绑定；
   ```js
  // 注： 所有的模板要被一个根节点包含起来
  // 注： 模板元素不要加引号
  class Student extends Person {
    constructor (props) {
      super(props); 
      this.state = {
        name: 'Miss'
      };
    }
    render() {
      return (
        <div> {this.state.name} </div>
      )
    }
  }

  ```
##### 3. IMG
1. import：使用import将图片导入到组件；
2. require： 直接在img src中require图片地址；详细代码如下
```js
import logo from '../assets/images/1.jpg';
class News extends React.Component{
  constructor(props){
    super(props);
    this.state={
      msg: '我是一个News组件'
    }
  }
  render(){
    return(
      <div className="news">
          {this.state.msg}
          <img src={logo} />
          <img src={require('../assets/images/1.jpg')} />
          <img src="https://www.baidu.com/img/xinshouye_353af22a7f305e1fb6cfa259394dea9b.png" />
      </div>
    )
  }
}
```

##### 4. 属性绑定
1. class -> className
  > react中将 class 改写成 className
  ```js
   constructor(props){
    super(props);
    this.state={
        msg:'我是一个home组件',
        color:'red',
        style:{
          color:'red',
          fontSize:'40px'
        }
      }
    }
    render() {
      return(
        <div>
          <div className={this.state.color}> 我是一个红的的div </div>
          <div className='home'>使用一个 home 的类</div>
        </div>
      )
    }
  ```
2. style
```js
// style属性写法也和以往的写法有不一样
<div style={{'color':'blue'}}>{this.state.title}</div>
<div style={{'color':this.state.color}}>{this.state.title}</div>
<div style={this.state.style}>我是一个红的的 div  行内样式</div>
```

3. for -> htmlFor
```html
<label htmlFor="name">姓名</label>
<input id="name"  />
```

4. 组件名称首字母大写、组件类名称首字母大写