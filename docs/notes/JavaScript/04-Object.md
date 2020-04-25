# Object 
[MDN / Object](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)  
[网道 / Object](https://wangdoc.com/javascript/types/object.html)  
[对象的新增方法(阮一峰)](https://es6.ruanyifeng.com/#docs/object-methods)  

## 1. 概述
- 对象是一种无序的复合数据集合，它由若干键值对组成。    

## 2. 方法

- ' . '  /  ['XX']     访问对象属性
- delete               删除 
- JSON.stringify       只串行化对象自身的可枚举的属性。
- in                   是否存在  
- hasOwnProperty       是否为对象自身的属性  
- for...in             循环 用来遍历一个对象的全部属性
- with 语句            操作同一个对象的多个属性时，提供一些书写的方便  

## 3. ES6 扩展方法
  - ...                   扩展运算符
  - ?.                    链判断运算符
  - ??                    Null 判断运算符,只有运算符左侧的值为null或undefined时，才会返回右侧的值
  - Object.is             用来比较两个值是否严格相等    
  - Object.assign         用于对象的合并    
  - Object.keys           返回 键名   数组；ES5 引入    
  - Object.values         返回 键值   数组；    
  - Object.entries        返回 键值对 数组, 将对象转为真正的Map结构    
  - Object.fromEntries    键值对数组 转为 对象, 适合将 Map 结构转为对象。    
  - Object.getOwnPropertyDescriptors  返回指定对象所有自身属性（非继承属性）的描述对象    
  - __proto__属性                     用来读取或设置当前对象的原型对象    
  - Object.setPrototypeOf             作用与__proto__相同，用来设置一个对象的原型对象   
  - Object.setPrototypeOf             该方法与Object.setPrototypeOf方法配套,用于读取一个对象的原型对象    

```js
// 一个对象
let obj ={
  name: '小明',
  birth: 2001,
  age: 19,
}

/** .操作符 */
  //  访问对象属性 
  obj.name;       // 小明  

/** ['xx'] */
  // 访问对象属性     
  obj['age'];     // 19     

/** delete */
  // 删除成功返回true
  delete obj.birth   // true    
  delete obj.sex     // true    删除一个不存在的属性，delete不报错，而且返回true。

/** in运算符 */
  // 用于检查对象是否包含某个属性（注意，检查的是键名，不是键值）
  // 包含就返回true，否则返回false  
  'name' in obj   // true  

/** hasOwnProperty */
  // 判断是否为对象自身的属性
  obj.hasOwnProperty('toString')     // false 

/** 循环遍历 */
  // 遍历一个对象的全部属性
  // 它遍历的是对象所有可遍历（enumerable）的属性，会跳过不可遍历的属性。
  //  它不仅遍历对象自身的属性，还遍历继承的属性。
  for (let i in obj) {              
    console.log('键名：', i);
    console.log('键值：', obj[i]);
  }

/** with 语句 */
  // 操作同一个对象的多个属性时，提供一些书写的方便
  with (obj) {    
    name = '张三';
    birth = 2002; 
  }               

  // 等同于
  obj.name = '张三';
  obj.birth = 2002;

```

```js
/** ?. 链判断运算符*/
  // 读取对象内部的某个属性，往往需要判断一下该对象是否存在
  let message = {
    name:'张三'
  }
  let res1 = message && message.name;
  let firstName = message?.firstName ?? '李四';

  console.log('res1', res1);
  console.log('firstName', firstName);

/** ??  Null 判断运算符*/
  // 读取对象属性的时候，如果某个属性的值是null或undefined
  const anima = response.settings.headerText ?? 'Hello, world!';

/** Object.is 比较对象*/
  // 比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。
  Object.is('foo', 'foo')     // true
  Object.is({}, {})           // false
  Object.is(+0, -0)           // false
  Object.is(NaN, NaN)         // true

/** Object.assign 合并对象*/ 
  // 方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）;
  // 第一个参数是目标对象，后面的参数都是源对象
  // 实行的是浅拷贝，而不是深拷贝
  // 同名属性: 一旦遇到同名属性，Object.assign的处理方法是替换，而不是添加。
  const target = { a: 1 };
  const source1 = { b: 2 };
  const source2 = { c: 3 };
  Object.assign(target, source1, source2);
  target      // {a:1, b:2, c:3}

/** Object.keys 键名数组*/
  // 返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。
  let obj = { foo: 'bar', baz: 42 };
  Object.keys(obj)    // ["foo", "baz"]

/** Object.values  键值数组*/   
  // 返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。
  // 参数是一个字符串，会返回各个字符组成的一个数组
  const obj = { 100: 'a', 2: 'b', 7: 'c' };
  Object.values(obj)      // ["b", "c", "a"];
  Object.values('foo')    // ['f', 'o', 'o']

/** Object.entries  键值对数组*/  
  // 返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。
  const obj = { foo: 'bar', baz: 42 };
  Object.entries(obj)     // [ ["foo", "bar"], ["baz", 42] ]

  // 将对象转为真正的Map结构
  const obj2 = { foo: 'bar', baz: 42 };
  const map = new Map(Object.entries(obj2));
  console.log(map)      // Map { foo: "bar", baz: 42 }

/** Object.fromEntries  键值对数组 转为 对象*/  
  // 将一个键值对数组转为对象。
  // 适合将 Map 结构转为对象。
  Object.fromEntries([
    ['foo', 'bar'],
    ['baz', 42]
  ])  // { foo: "bar", baz: 42 }

  // 配合URLSearchParams对象，将查询字符串转为对象
  Object.fromEntries(new URLSearchParams('foo=bar&baz=qux')) // { foo: "bar", baz: "qux" }


/** Object.getOwnPropertyDescriptors */

/** __proto__属性 */

/** Object.setPrototypeOf */

/** Object.setPrototypeOf */   




```