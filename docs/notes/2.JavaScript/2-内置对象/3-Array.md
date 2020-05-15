# JavaScript Array

[面试](https://juejin.im/post/5dafb263f265da5b9b80244d#heading-84)
[API 全解密](https://juejin.im/entry/59ad2cacf265da248a7aa6cc#改变自身值的方法-9个)
[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array);

## 1. 简介

- 数组是值得有序集合,每一个值叫做元素，而每一个元素在数组中有一个位置，以数字表示，叫做索引;
- 数组元素可以是任意类型，同一个数组中的不同元素可能是对象或数组；
- 数组的空位：当数组的某个位置是空元素，就两个逗号之间没有任何值，但不影响数组长度；
- 本质上属于一种特殊的对象， typeof 运算符会返回数组的类型是 objiect
  - 特殊性体现在 它的键名是按次序排列的一组整数（1，2,3，...）;  

## 2. 创建、读、写、长度（构造器/字面量）

```js
// 使用Array构造器

let a = new Array(8); // [empty*8]
// 使用对象字面量
let b = [];
b.length = 8; // [empty*8]

// 创建: 一个有3个值得数组
let c = ['a','b','c']
// 写入: 给数组下标3写入一个值
c[3] = 'd';   // ['a','b','c','d']
// 读取: 数组的某个下标的值
console.log(c[0])  // a
// 长度: length
console.log(c.length)  // 4
```

## 3. 扩展运算符

***扩展运算符（ ... ）***

- 扩展运算符是三个点 （...）,将一个数组转为用逗号分隔的参数序列；

```js
  let ar6 = [1,35,234,54,6455,76];
  console.log(...ar6)   // 1 35 234 54 6455 76
```

- 常用于函数调用

  ```js
    // 函数调用
    function add(x, y) {
      return x + y;
    }
    const numbers = [4, 38];
    add(...numbers) // 42
  ```

- 扩展运算符应用：
  - 复制数组: 数组是复合型数据类型，直接复制，只是复制了指向底层数据结构的指针，而不是克隆一个全新的数组；

  ```js
    // a2并不是a1的克隆，而是指向同一份数据的另一个指针。修改a2，会直接导致a1的变化。
    const a1 = [1, 2];
    const a2 = a1;
    a2[0] = 2;
    a1 // [2, 2]

    // 扩展运算符提供了复制数组方法 可以避免 修改a2，导致a1的变化
    const a1 = [1, 2];
    const a2 = [...a1]; // 写法一
    const [...a2] = a1; // 写法二
  ```

  - 合并数组
  
  ```js
    // 以下两种方法都是浅拷贝;
    // 如果修改了原数组的成员，会同步反映到新数组
    const arr1 = ['a', 'b'];
    const arr2 = ['c'];
    const arr3 = ['d', 'e'];
    // ES5 的合并数组
    arr1.concat(arr2, arr3);  // [ 'a', 'b', 'c', 'd', 'e' ]
    // ES6 的合并数组
    [...arr1, ...arr2, ...arr3]  // [ 'a', 'b', 'c', 'd', 'e' ]
  ```

  - 与解构赋值结合
    - 扩展运算符可以与解构赋值结合起来，用于生成数组

  ```js
    let data= ['a','n','s','p']
    let last = data[0], val = data.slice(1); // ES5
    let [first, ...rest] = data;  // ES6
    console.log(first) // a
    console.log(rest)  // ["n", "s", "p"]

    // 注：如果将扩展运算符用于数组赋值，只能放在参数的最后一位
    let [...lal, bb] = data;  // 报错
  ```

  - 字符串转数组
  
  ```js
  const str = 'hello word';
  const arr = [...str];
  console.log(arr); // ["h", "e", "l", "l", "o", " ", "w", "o", "r", "d"]
  ```

  - Map 和 Set 结构，Generator 函数

## 4. ES6新增的构造函数方法

***1. Array.from()***

- 可以将一个类数组对象或者可遍历对象转换成一个真正的数组
  - 类数组对象，就是具有length属性的对象；
- 可以将Set结构的数据转换为真正的数组；
- 可以接受第二个参数，作用类似于数组的map方法
  - 用来对每个元素进行处理，将处理后的值放入返回的数组
- 可以将字符串转换为数组

```js
  // 将类数组对象转换为真正数组：
  let arrayLike = {
      0: 'tom',
      1: '65',
      2: '男',
      3: ['jane','john','Mary'],
      'length': 4
  }
  let arr = Array.from(arrayLike)
  console.log(arr);

  // 将Set结构的数据转换为真正的数组
  let arr = [12,45,97,9797,564]
  let set = new Set(arr)
  console.log(Array.from(set))  // [ 12, 45, 97, 9797, 564]
  console.log(Array.from(set, item => item + 1)) // [ 13, 46, 98, 9798, 565]

  //将字符串转换为数组
  let  str = 'hello';
  console.log(Array.from(str)) // ["h", "e", "l", "l", "o"]
```

***2. Array.of()***

- 用于将一组值，转换为数组；
- 主要是弥补数组构造函数Array()的不足，因为参数个数不同，会导致Array()的行为有差异
  - 在 Array() 方法中参数少于2个，就不会用参数组成数组
- Array.of基本可以替代 Array() 或 new Array(),并且不存在由参数不同导致的重载

```js
  // Array 不足
  Array() // []
  Array(3) // [, , ,]  参数少于2个
  Array(3, 11, 8) // [3, 11, 8]

  // Array.of 总是返回参数值组成的数组。如果没有参数，就返回一个空数组
  Array.of() // []
  Array.of(undefined) // [undefined]
  Array.of(1) // [1]
  Array.of(1, 2) // [1, 2]
```

## 5. Array.isArray 判断对象是否为数组

```md
- 判断对象是否为数组
- 如果对象是数组返回 true，否则返回 false。
- 语法： Array.isArray(obj)
    - obj 必需 要判断的对象。

  const arr = ["Banana", "Orange", "Apple", "Mango"];
  console.log(Array.isArray(arr))
```

## 6. ES5 Array.prototype

***1. concat(连接两个或更多的数组)***

- 连接两或多个数组，不会改变自身值

```js
let ar1 = ['a','b','c'];
let ar2 = ['d','e','f'];
console.log(ar1.concat(ar2)); //  ["a", "b", "c", "d", "e", "f"]
console.log(ar1); //  ["a", "b", "c"]
console.log(ar2); //  ["d", "e", "f"]
```

***2. join(指定分隔符)***

- 指定分割符进行分割，不会改变自身值

```js
let ar1 = ['a','b','c'];
console.log(ar1.join('|')) // a|b|c
console.log(ar1);     //  ["a", "b", "c"]
```

***3. slice(选取元素)***

- 选取数组的的一部分，并返回一个新数组，不会改变自身值。

```js
let ar1 = ['a','b','c',656,1204];
console.log(ar1.slice(0,3)) // ["a", "b", "c"]
```

***4. pop(删除并返回最后一个元素)***

- 删除最后一个元素，把数组长度减1，并返回它删除的元素的值
- 如果数组已经为空，则不改变数组，并返回undefined
- 会改变自身值

```js
let ar1 = ['George','John','Thomas'];
console.log(ar1.pop('|')) // Thomas
console.log(ar1);     //  ['George','John']
```

***5. shift(删除第一个,并返回第一个元素的值)***

- 把数组的第一个元素从其中删除，并返回第一个元素的值
- 不会创建新数组，直接修改原有的数组，会改变自身值；
- 如果数组为空，该方法将不进行任何操作 返回undefined

```js
let ar1 = ['a','b','c'];
console.log(ar1.shift()) // a
console.log(ar1);     //  ["b", "c"]
```

***6. splice(删除元素并添加新元素)***

- 从数组中删除元素并添加新元素，会改变自身值；
- 参数：
  - index 必填 规定添加/删除元素的位置，负数从数组结尾处规定位置
  - howmany 必填 删除元素数量，设置为0，则不会删除元素
  - item 可选 向数组添加的新元素

```js
// 删除下标2的元素，并不添加新元素
let ar1 = ['a','b','c'];
console.log(ar1.splice(2)) // ["c"]
console.log(ar1);     // ["a", "b"]

// 删除下标1 开始的两个元素，并不添加新元素
let ar2 = ['fsd','xcv','liu','ret','df'];
console.log(ar2.splice(1,2)) // ["xcv", "liu"]
console.log(ar2);     // ["fsd", "ret", "df"]

// 删除下标1 元素，并添加 nike 元素
let ar2 = ['fsd','xcv','liu','ret','df'];
console.log(ar2.splice(1,1,'nike')) // ["xcv"]
console.log(ar2);     // ["fsd", "nike", "liu", "ret", "df"]
```

***7. push(末尾添加元素))***

- 方法可向数组的末尾添加一个或多个元素，并返回新的长度。
- 会改变自身值

```js
let ar1 = ['a','b','c'];
console.log(ar1.push('d','e')) // 5 (数组长度)
console.log(ar1);     //  ['a','b','c','d','e']
```

***8. unshift(向数组开头添加元素)***

- 可向数组的开头添加一个或更多元素，并返回新的长度，会改变自身值
- 参数：
  - newelement1 必填 向数组添加的第一个元素
  - newelement2 可选 向数组添加的第二个元素
  - newelement3 可选 可添加若干个元素

```js
let ar1 = ['a','b','c'];
console.log(ar1.unshift('a1','a2','a...')) // 6
console.log(ar1);     //  ["a1", "a2", "a...", "a", "b", "c"]
```

***9. reverse(颠倒顺序)***

- 颠倒数组中元素的顺序;
- 该方法会改变原来的数组，而不会创建新的数组，改变自身值;

```js
let ar1 = ['a','b','c'];
console.log(ar1.reverse())  // ["c", "b", "a"]
console.log(ar1);   // ["c", "b", "a"]
```

***10. sort(排序)***

- 用于数组元素进行排序

```js

```

***11. includes(检测数组)***

```md
  - 检测数组是否包含指定元素
  - arr.includes(searchElement)
  - arr.includes(searchElement, fromIndex)
    - searchElement 必须。需要查找的元素值。
    - fromIndex 可选。从该索引处开始查找 searchElement

  let array1 = [1, 2, 3];
  console.log(array1.includes(2));  // true
```

***11. toSource(返回该对象源代码)***

- 表示对象的源代码，通常由

```js
```

***12. toString(数组转换字符串)***

- 方法可把数组转换为字符串，并返回结果，不会改变自身值。

```js
let ar1 = [1,2,3];
console.log(ar1.toString()) // 1,2,3
console.log(ar1);     // [1, 2, 3]
```

***13. toLocaleString(把数组转为本地数组)***

- 把数组转换为本地字符串，不会改变自身值。

```js
let ar1 = [1,2,3];
console.log(ar1.toLocaleString()) // 1,2,3
console.log(ar1);     // [1, 2, 3]
```

***14. valueOf(返回数组对象原始值)***

- 是数组对象的默认方法，不会改变自身值
- 方法返回 Array 对象的原始值

```js
let ar1 = ['a','b','c'];
console.log(ar1.valueOf()) // ["a", "b", "c"]
console.log(ar1);     //  ['a','b','c']

var d = new Date();
console.log(d)        // Sat Nov 02 2019 13:49:02 GMT+0800 (中国标准时间)
console.log(d.valueOf())  // 1572673742882
```

## 7. ES6 Array.prototype

***1. copyWithin()***

- 从数组的指定位置拷贝元素到数组的另一个指定位置中
- 接受参数： Array.prototype.copyWithin(target, start = 0, end = this.length)
  - target 必填 复制到指定目标索引位置
  - satrt  可选 元素复制的起始位置
  - end    可选 停止复制的索引位置

```js
//复制数组的前面两个元素到第三和第四个位置上：
var fruits = ["Banana", "Orange", "Apple", "Mango", "Kiwi", "Papaya"];
fruits.copyWithin(2, 0, 2); // [Banana,Orange,Banana,Orange,Kiwi,Papaya]

// 将3号位复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)  // [4, 2, 3, 4, 5]

// -2相当于3号位，-1相当于4号位
[1, 2, 3, 4, 5].copyWithin(0, -2, -1)  // [4, 2, 3, 4, 5]

// 将3号位复制到0号位
[].copyWithin.call({length: 5, 3: 1}, 0, 3)  // {0: 1, 3: 1, length: 5}
```

***2. find()***

- 返回符合传入测试（函数）条件的数组元素；
  - 数组中的每一个元素都会调用一次函数执行
  - 当元素符合函数条件将返回 true，之后的值就不会再调用执行函数
  - 当所有元素都不符合函数条件则返回 undefined；
  - array.find(function(currentValue, index, arr),thisValue)

```js
const arr = [45,36,78,99,150];
const aa = arr.find(item => item > 100);
console.log(aa)  // 150  找到了符合函数条件的元素
```

***3. findIndex()***

- 返回符合传入测试（函数）条件的数组元素索引；
  - 同find方法一样，只是找的是元素的索引

```js
const arr2 = [45,36,78,99,150];
const aa2 = arr2.findIndex(item => item > 100);
console.log(aa2)  // 4  找到了符合函数条件元素的索引
```

***4. fill()***

- fill() 方法用于将一个固定值替换数组的元素。
- array.fill(value, start, end)
  - value 必填 填充的值
  - start 可选 开始填充位置
  - end   可选 停止填充位置 默认数组长度

```js
let arr3 = [24,52,36,778,12,1264,14552,2154];
let arr4 = [24,52,36,778,12,1264,14552,2154];
let arr3fil = arr3.fill(1);
let arr4fil = arr4.fill('fill', 2, 7);
console.log(arr3fil) //   [1, 1, 1, 1, 1, 1, 1, 1]
console.log(arr4fil) //  [24, 52, "fill", "fill", "fill", "fill", "fill", 2154]
```

***5. flat()***

- flat() 用于将嵌套的数组“拉平”，变成一堆数组，
- 该方法返回一个新数组，对原始数据没影响；

```js
// 1. 默认只会“拉平”一层
  [1, 2, [3, 4]].flat(); // [1, 2, 3, 4]

// 2. 指定拉平层数
  [1, 2, [3, [4, 5]]].flat(2) // [1, 2, 3, 4, 5]

// 3. 拉平所有 （Infinity关键字）
  [1, [2, [3]]].flat(Infinity) // [1, 2, 3]

// 4. 如果原数组有空位，flat()方法会跳过空位
  [1, 2, , 4, 5].flat() // [1, 2, 4, 5]
```

***6. flatMap()***

- 对原始数组的每一个成员执行一个函数，然后对返回值组成的数组执行 flat()方法；
- 该方法返回一个新数组 不改变原来数组
- 默认只能展开一层

```js
// 1 相当于 [[4], [6], [8]].flat()
[2, 3, 4].flatMap((x) => [x * 2]) // [4,6,8]

// 2 相当于 [[[2]], [[4]], [[6]], [[8]]].flat()
[1, 2, 3, 4].flatMap(x => [[x * 2]])// [[2], [4], [6], [8]]
```

## 8. Array 遍历方法

***1. forEach***

```md
  - 语法：arr.forEach(fn, thisArg)
  - fn 表示在数组每一项上执行的函数，接受三个参数：
      value 当前正在被处理的元素的值
      index 当前元素的数组索引
      array 数组本身
  - thisArg 可选，用来当做fn函数内的this对象
  - 注：forEach无法直接退出循环，只能使用return 来达到for循环中continue的效果
```

***2. every***

```md
  - every() 方法使用传入的函数测试所有元素，只要其中有一个函数返回值为 false，那么该方法的结果为 false；
  - 如果全部返回 true，那么该方法的结果才为 true
  - 例：
  const arr= [15, 20, 33, 55];
  arr.every(item => item>100); // false
  arr.every(item => item<100); // true
```

***3. some***

- 扩展运算符是三个点 （...）,将一个数组转为用逗号分隔的参数序列；

```md
  - some() 与 every() 相反；
  - some 测试数组元素时，只要有一个函数返回值为 true，则该方法返回 true，
  - 全部返回false 该方法结果才会是 false
  - 例：
  const arr= [15, 20, 33, 55];
  arr.some(item => item < 20); // true
  arr.some(item => item > 100); // false
```

***4. filter***

- 通过检测指定数组中符合条件的所有的元素，组成一个新数组；
- 不会对新数组进行检测
- 不会改变原始数组
- array.filter(function(currentValue, index,arr), thisValue)
  - currentValue  必须 当前元素的值
  - index         可选 当前元素的索引
  - arr           可选 当前元素属于的数组对象

```js
let arr5 = [32,55,66,10,15,17];
arr5.filter(item => item > 50);  // [55, 66]
```

***5. map***

- Js自带的map()方法
- 返回一个新数组，数组中的元素为原始数组元素用于函数处理后的值
- 同样不对空数组进行检测
- 不改变原始数组
- array.map(function(currentValue,index,arr), thisValue)

```js
let arr5 = [32,55,66,10,15,17];
let newAry = [];
arr5.map(item => {
  if(item > 50) newAry.push(item)
});  
console.log(newAry)// [55, 66]
```

***6. reduce***

- 接受一个方法做为累加器，数组中的每一个值开始合并(重左到右) 最终为一个值
- arr.reduce(function(total,value, index,arr), initValue)
  - total 必须 上一次调用回调返回的值，或者是提供的初始值
  - value 必须 当前元素
  - index 可选 当前元素索引
  - arr   可选 当前元素所属的数组对象
  - initValue 可选 指定第一次调用 fn 的第一个参数

```js
const arry0 = [15.5, 2.3, 2.7, 6.8, 7.2];
let a1 = arry0.reduce((total,value) => total+value)
console.log(a1) // 34.5
```

***7. reduceRight***

```md
 - reduceRight 与 reduce只是每个值合并的方向不一致；
 - reduceRighe 从右到左
```

***8. entries(ES6)***

```md
  - 返回一个数组的迭代对象，该对象包含数组的键值对 (key / value);
  - 迭代对象中数组的索引值作为 key，数组元素作为 value;
  - 语法：array.entries()

  const array = ['a','b','v','c'];
  let aa = array.entries();
  console.log(aa)
```

***9. keys(ES6)***

```md
  - 用于从数组创建一个包含数组键的可迭代对象
  - 如果对象是数组返回 true，否则返回 false。
  - 语法：arr.keys()
  let array = ['a','b','c'];
  let iterator = array.keys();
```

***10. values(ES6)***

***11. Symbol.iterator(ES6)***

## 9. 数组的空位

- 数组的空位指 数组的某一个位置没有任何值；
- 空位不是undefined，是没有任何值
- forEach(), filter(), reduce(), every() 和some()都会跳过空位。
- map()会跳过空位，但会保留这个值
- join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串
- Arrary.from() 扩展运算符(...) 将空位转化为 undefined
- copyWithin() 会连空位一起拷贝
- fill() 会将空位视为正常的数组位置
- for...of 循环也会遍历空位

## 10. 数组去重
  #### 10.1 利用 Set 去重
  ```js
    /* 
      1.返回值是一个去重的数组 
      2.注意 Number 和 String 类型
    */
    var arr = ['one','two','three','one','three','two','four'];
    let el = new Set(arr);
    console.log(el); // ['one','two','three','four'];
  ```

  #### 10.2 利用 filter去重
  ```js
    let arr = ['one','two','three','one','three','two','four'];
    let el = arr.filter((item,index)=>arr.indexOf(item)===index);
    console.log(el); // ['one','two','three','four'];
  ```

  #### 10.3 利用 Map 数据结构去重
  ```js
    function arrayNonRepeatfy(arr) {
      let map = new Map();
      let array = new Array();  // 数组用于返回结果
      for (let i = 0; i < arr.length; i++) {
        if(map .has(arr[i])) {  // 如果有该key值
          map .set(arr[i], true); 
        } else { 
          map .set(arr[i], false);   // 如果没有该key值
          array .push(arr[i]);
        }
      } 
      return array ;
    }
    var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
    console.log(unique(arr))
  ```

  #### 10.4 利用includes
  ```js
    function unique(arr) {
      if (!Array.isArray(arr)) {
        console.log('type error!')
        return
      }
      var array =[];
      for(var i = 0; i < arr.length; i++) {
        if( !array.includes( arr[i]) ) {//includes 检测数组是否有某个值
          array.push(arr[i]);
        }
      }
      return array
    }
    var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
    console.log(unique(arr))
    //[1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {…}, {…}]     //{}没有去重
  ```

  #### 10.5 利用对象特性去重 (Object.keys)
  ##### （1）对象方法 和 for 循环
  ```js
    /*
      1.声明一个对象 obj,利用对象特性
      2.循环每一项复印，使用 keys(values) 方法取出 key 值
    */
    var arr = ['one','two','three','one','three','two','four'];
    var obj = {};
    for(var i=0;i<arr.length;i++){
        obj[arr[i]] = arr[i];
    };
    var el =  Object.keys(obj);
    console.log(el) // ['one','two','three','four'];
  ```

  ##### （2）对象方法 和 arr.forEach
  ```js
    /* 
      1. 和上面方法一致，只不过是使用了 forEach
    */
    var arr = ['one','two','three','one','three','two','four'];
    var obj = {};
    arr.forEach(function(ele,index,arr){
        obj[arr[index]] = arr[index];
    });
    var el =  Object.keys(obj);
    console.log(el) // ['one','two','three','four'];
  ```

  #### 10.6 利用for嵌套for，然后splice去重（ES5中最常用）
  ```js
    function unique(arr){            
      for(var i=0; i<arr.length; i++){
        for(var j=i+1; j<arr.length; j++){
          if(arr[i]==arr[j]){         //第一个等同于第二个，splice方法删除第二个
            arr.splice(j,1);
            j--;
          }
        }
      }
    return arr;
    }
    var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
    console.log(unique(arr))
    //[1, "true", 15, false, undefined, NaN, NaN, "NaN", "a", {…}, {…}]     //NaN和{}没有去重，两个null直接消失了
    // 双层循环，外层循环元素，内层循环时比较值。值相同时，则删去这个值。
    // 想快速学习更多常用的ES6语法，可以看我之前的文章《学习ES6笔记──工作中常用到的ES6语法》。
      
  ```

  #### 10.7 利用 indexOf() 和 lastIndexOf() 去重
  ```js
    /*
      indexOf：从左往右查找目标字符串，是否包含 Value;
              如果包含，返回第一次出现的索引;
              如果不包含，返回 -1
      indexOf 和 lastIndexOf() 方法一样
      步骤：
      1. 先声明一个空数组，用来存放去重后的数据
      2. 遍历数组，判断每一项
    */
    let arr = ['one','two','three','one','three','two','four'];
    let indexArr = [];
    arr.forEach(item => {
      if(indexArr.indexOf(item)===-1){
          indexArr.push(item);
      };
    });
    console.log(indexArr); // ['one','two','three','four'];
  ```

 

  
  





  #### 10.8 利用递归去重
  ```js
    function unique(arr) {
      var array= arr;
      var len = array.length;
      array.sort(function(a,b){   //排序后更加方便去重
          return a - b;
      })
      function loop(index){
        if(index >= 1){
          if(array[index] === array[index-1]){
              array.splice(index,1);
          }
          loop(index - 1);    //递归loop，然后数组去重
        }
      }
      loop(len-1);
      return array;
    }
    var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
    console.log(unique(arr))
    //[1, "a", "true", true, 15, false, 1, {…}, null, NaN, NaN, "NaN", 0, "a", {…}, undefined]
  ```