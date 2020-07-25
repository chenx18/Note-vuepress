# Set、WeakSet 数据结构

## Set

### 基本

- Set是Es6提供的新的数据结构，类似数组，成员唯一，没有重复值
- 允许存储任何类型的唯一值
- 本身是一个构造函数，用来生成 set 数据结构
- 特殊值：
  - +0与-0 在存储判断唯一性的时候是恒等的，所以不重复
  - undefined 与 undefined 是恒等，所以不重复
  - NaN 与 NaN 不恒等，但在set中只能存在一个， 不重复；
- 属性：
  - Set.prototype.constructor：构造函数，默认就是Set函数。
  - Set.prototype.size：返回Set实例的成员总数

```js
// 参数可以接受一个数组，size 属性
const sets = new Set([1,14,25,36,12,45,315])
console.log([...sets])  //  [1, 14, 25, 36, 12, 45, 315]
console.log(sets.size)  //  7
```

### set方法

- Set.prototype.add(value)：添加某个值，返回 Set 结构本身。
- Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
- Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员。
- Set.prototype.clear()：清除所有成员，没有返回值。

```js
// 添加 add()
let addVals = new Set();
// addVals.add(1);
// addVals.add(NaN);
addVals.add(1).add(NaN).add({c1: 1, c2: 2})   // 或者链式编程写法
console.log(addVals)      // {1, NaN,{c1: 1, c2: 2}}
console.log(addVals.size) // 3

// set成员判断、set成员删除、set成员清除
let data = new Set([66,77,88,99,10]);
data.has(66)      // true
data.delete(10)   // true
data.clear()

// Array 转 Set
const mySet = new Set(["value1", "value2", "value3"]);  // {"value1", "value2", "value3"}

// Set 转 Array, 用...操作符，
const items = new Set([1, 2, 3, 4, 5]);
let myArray = [...items];     // [1, 2, 3, 4, 5]

// set 转 Array, 用Array.from()
const items = new Set([1, 2, 3, 4, 5]);
const array = Array.from(items);  // [1, 2, 3, 4, 5]

// String 转 Set，注：Set 中 toString 方法是不能将 Set 转换成 String
let mySet = new Set('hello');  // Set(4) {"h", "e", "l", "o"}

// 数组去重
let mySet = new Set([1, 2, 3, 4, 4]);
[...mySet]; // [1, 2, 3, 4]

// 并集
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);
let union = new Set([...a, ...b]); // {1, 2, 3, 4}

// 交集
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);
let intersect = new Set([...a].filter(x => b.has(x))); // {2, 3}

// 差集
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);
let difference = new Set([...a].filter(x => !b.has(x))); // {1}

```

### set遍历

- Set.prototype.keys()：    返回键名的遍历器
- Set.prototype.values()：  返回键值的遍历器
- Set.prototype.entries()： 返回键值对的遍历器
- Set.prototype.forEach()： 使用回调函数遍历每个成员
- 注： 由于Set结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。

```js
  // keys方法、values方法、entries方法返回的都是遍历器对象
  let data = new Set([1,2,3]);
  
  for (let item of data.keys()) {
    console.log(item);
  }
  // 1
  // 2
  // 3

  for (let item of data.values()) {
    console.log(item);
  }
  // 1
  // 2
  // 3

  // entries方法返回的遍历器，同时包括键名和键值，所以每次输出一个数组，它的两个成员完全相等。
  for (let item of data.entries()) {
    console.log(item);
  }
  // [1, 1]
  // [2, 2]
  // [3, 3]

  data.forEach((value, key) => console.log(key + ' : ' + value)) 
  // 1 : 1  
  // 2 : 2  
  // 3 : 3

  // 直接遍历set实例，等同于遍历set实例的values方法
  for (let i of data) {
    console.log(i)
  }
  // 1
  // 2
  // 3
```

## WeakSet

### 基本用法

- 与 Set 类似，也是不重复值的集合；
- 不同在于 WeakSet 的成员只能是对象，而不能是其它类型的值；
- const ws = new WeakSet();

```js
  // WeakSet 是一个构造函数，可以使用new命令，创建 WeakSet 数据结构。
  const a = [[1, 2], [3, 4]];
  const b = [3, 4];
  const c = {name: 'zhang'}
  const aws = new WeakSet(a);   // {[1, 2], [3, 4]}
  const bws = new WeakSet(b);   // Uncaught TypeError: Invalid value used in weak set(…)
  const cws = new WeakSet(c);   // Uncaught TypeError: Invalid value used in weak set(…)

  // 所以注意，是a数组的成员成为 WeakSet 的成员，而不是a数组本身。这意味着，数组的成员只能是对象。
```

### 方法

- WeakSet.prototype.add(value)：向 WeakSet 实例添加一个新成员。
- WeakSet.prototype.delete(value)：清除 WeakSet 实例的指定成员。
- WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在。

```js
  const ws = new WeakSet();
  const obj = {};
  const foo = {};

  ws.add(window);
  ws.add(obj);

  ws.has(window); // true
  ws.has(foo);    // false

  ws.delete(window);
  ws.has(window);    // false
```
