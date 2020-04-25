## 事件处理
##### 表单事件
1. 监听表单的改变事件onChange；
2. 获取表单的值
```js
import React from 'react';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      msg: '我是home组件',
      userName: ''
    }
  }
  // 1. 监听表单的改变事件onChange；
  inputChange=(e) => {
    this.setState({
      userName: e.target.value
    })
  }

  // 2. 获取表单的值
  getInput=()=>{
    alert(this.state.username);
  }

  render() {
    return(
      <div>
        {this.state.msg}
        <h2>表单事件</h2>
        <input onChange={this.inputChange}/>
        <button onClick={this.getInput}>获取input的值 </button>
      </div>
    )
  }
}
```
##### 键盘事件
1. 键盘抬起: onKeyUp = {this.onKeyUp}
2. 键盘按下: onKeyDown = {this.onKeyDown}
```js
import React from 'react';
import '../assets/css/index.css';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      userName: ''
    }
  }

  // 输入框监听
  inputChange=(e) => {
    let val = this.refs.username.value;
    this.setState({
      userName: val
    })
  }

  // 键盘抬起事件
  inputKeyUp=(e)=>{
    console.log(e.keyCode);
    console.log(e.target.value);
  }
  
  // 键盘按下
  inputonKeyDown=(e)=>{
    console.log(e.keyCode);
    console.log(e.target.value);
  }
  render() {
    return(
      <div>
        {this.state.msg}
        <h2>键盘事件</h2>
        <input ref="username" onChange={this.inputChange}/>
        <input onKeyUp={this.inputKeyUp}/>
        <input onKeyDown={this.inputonKeyDown}/>
      </div>
    )
  }
}
```
##### 获取DOM节点（ref）
1. 给元素定义ref属性；
2. 通过this.refs.username 获取dom节点
```js
import React from 'react';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      msg: '我是home组件',
      userName: ''
    }
  }
  inputChange=(e) => {
    let val = this.refs.username.value;
    this.setState({
      userName: val
    })
  }
  getInput=()=>{
    alert(this.state.username);
  }

  render() {
    return(
      <div>
        {this.state.msg}
        <h2>获取DOM节点（ref）</h2>
        <input ref="username" onChange={this.inputChange}/>
        <button onClick={this.getInput}>获取input的值 </button>
      </div>
    )
  }
}
```
##### 双向数据绑定
1.  model改变影响View ；view改变反过来影响model；
2. 通过this.refs.username 获取dom节点
```js
import React from 'react';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      msg: '我是home组件',
      userName: ''
    }
  }
  inputChange=(e) => {
    let val = this.refs.username.value;
    this.setState({
      userName: val
    })
  }
  getInput=()=>{
    alert(this.state.username);
  }

  render() {
    return(
      <div>
        <h2>双向数据绑定</h2>
        <input ref="username" value={this.state.userName} onChange={this.inputChange}/>
        <p>{this.state.userName}</p>
      </div>
    )
  }
}
```

##### 表单示例
```js
import React, { Component } from 'react';
class ReactForm extends Component {
  constructor(props) {
      super(props);
      this.state = {  
          msg:"react表单",
          name:'',  
          sex:'1',     
          city:'',      
          citys:[ 
              
              '北京','上海','深圳'            
          ],
          hobby:[   
              {  
                'title':"睡觉",
                'checked':true
              },
              {  
                  'title':"吃饭",
                  'checked':false
              },
              {  
                  'title':"敲代码",
                  'checked':true
              }
          ],
          info:''   
      };
      this.handleInfo=this.handleInfo.bind(this);
  }
    handelSubmit=(e)=>{
            //阻止submit的提交事件
            e.preventDefault();
            console.log(this.state.name,this.state.sex,this.state.city,this.state.hobby,this.state.info);
    }

    handelName=(e)=>{
        this.setState({
            name:e.target.value
        })
    }

    handelSex=(e)=>{
        this.setState({
            sex:e.target.value
        })
    }

    handelCity=(e)=>{
        this.setState({
            city:e.target.value
        })
    }

    handelHobby=(key)=>{
        var hobby=this.state.hobby;
        hobby[key].checked=!hobby[key].checked;
        this.setState({
            hobby:hobby
        })
    }

    handleInfo(e){
        this.setState({
            info:e.target.value
        })
    }
    render() {
        return (
            <div>
                <h2>{this.state.msg}</h2>
                <form onSubmit={this.handelSubmit}>
                  用户名:  <input type="text" value={this.state.name}  onChange={this.handelName}/> <br /><br />
                  性别:    <input type="radio" value="1" checked={this.state.sex==1}  onChange={this.handelSex}/>男 
                            <input type="radio"  value="2" checked={this.state.sex==2}  onChange={this.handelSex}/>女 <br /><br /> 
                 居住城市:  
                        <select value={this.state.city} onChange={this.handelCity}>
                            {
                                this.state.citys.map(function(value,key){
                                    return <option key={key}>{value}</option>
                                })
                            }
                        </select>
                <br /><br />
                 爱好:   
                    {
                        // 注意this指向
                        this.state.hobby.map((value,key)=>{
                            return (
                               <span key={key}>
                                    <input type="checkbox"  checked={value.checked}  onChange={this.handelHobby.bind(this,key)}/> {value.title} 
                               </span>
                            )
                        })
                    }
                    <br /><br />
                  备注：<textarea vlaue={this.state.info}  onChange={this.handleInfo} />
                 <input type="submit"  defaultValue="提交"/>
                  <br /><br /> <br /><br />
                </form>
            </div>
        );
    }
}
export default ReactForm;
```