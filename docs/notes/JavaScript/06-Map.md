# Map 数据结构

[阮一峰Map](http://es6.ruanyifeng.com/#docs/set-map)
[弄懂Map](https://juejin.im/post/5cece5e9e51d45105e021238#heading-0)

## 简介

- Map 对象保存键值对；任何值（对象或者原始值）都可以作为一个键或一个值
- Map 与 Objects 区别：
  - Map 中的键值是有序的，而添加到对象中的键则不是
  - Map 的键值对个数可以从size属性获取，而Object的键值队个数只能手动计算
  - Object 都有自己的原型，原型链上的键名有可能和你自己在对象上设置的键名产生冲突
- Map 对象属性：
  - size：返回Map对象中所包含的键值队个数

## Map对象的方法

- set(key,val): 向Map中添加新元素
- get(key): 通过键值查找特定的数值并返回，如果找不到key 返回undefined
- has(key): 通过查找某个键是否在Map对象中，返回一个布尔值
- delete(key): 删除某个键，返回true，删除失败为false
- clear(): 清除所有成员，没有返回值

```js
// 构建
const map = new Map([['name','张'],['age', 20]]);
map.set('word','搬砖')
map.get('name')  // 张
map.has('name')  // true
map.sie // 3
console.log(map) // Map(3) {"name"=>"张","age"=>20,"word"=>"搬砖"}

```

## Map对象遍历方法

- keys(): 返回键名的遍历器
- values(): 返回键值的遍历器
- entries(): 返回键值对的遍历器
- forEach(): 使用回调函数遍历每一个成员

```js
const map = new Map([['name','张'],['age', 20]]);

for (let key of map.keys()) {
  console.log(key)
}
// "name"
// "age"

for(let val of map.values()) {
  console.log(val)
}
// "张"
// 20

for(let item of map.entries()){
  console.log(item)
}
// "name" "张"
// "age" 20

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
// "name" "张"
// "age" 20

// 等同于使用map.entries()
for (let [key, value] of map) {
  console.log(key, value);
}
// "name" "张"
// "age" 20

map.forEach((value, key, map)=>{
  console.log("Key: %s, Value: %s", key, value);
})
// Key: name, Value: 张
// Key: age, Value: 20
```

## 数据结构的互相转换

- Map 转数组，使用扩展运算符
- 数组 转 Map
- Map 转为对象
- 对象转为 Map
- Map 转为 JSON,
- JSON 转为 Map

```js
  //1. Map 转为数组,使用扩展运算符（...）。
  const myMap = new Map()
    .set(true, 7)
    .set({foo: 3}, ['abc']);
  [...myMap] // [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]
  
  //2. 数组 转为 Map,将数组传入 Map 构造函数
  new Map([
    [true, 7],
    [{foo: 3}, ['abc']]
  ])
  // Map {
  //   true => 7,
  //   Object {foo: 3} => ['abc']
  // }


  // 3. Map 转为对象
  // 如果所有 Map 的键都是字符串，它可以无损地转为对象。
  // 如果有非字符串的键名，那么这个键名会被转成字符串，再作为对象的键名。
  function strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k,v] of strMap) {
      obj[k] = v;
    }
    return obj;
  }

  const myMap = new Map()
    .set('yes', true)
    .set('no', false);
  strMapToObj(myMap)
  // { yes: true, no: false }
  

  //4 对象转为 Map
  function objToStrMap(obj) {
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
      strMap.set(k, obj[k]);
    }
    return strMap;
  }

  objToStrMap({yes: true, no: false})
  // Map {"yes" => true, "no" => false}


  // 5 Map 转为 JSON, 区分两种情况。

  //  5.1 一种情况是，Map 的键名都是字符串，这时可以选择转为对象 JSON。
  function strMapToJson(strMap) {
    return JSON.stringify(strMapToObj(strMap));
  }
  let myMap = new Map().set('yes', true).set('no', false);
  strMapToJson(myMap)  // '{"yes":true,"no":false}'

  //  5.2 另一种情况是，Map 的键名有非字符串，这时可以选择转为数组 JSON。
  function mapToArrayJson(map) {
    return JSON.stringify([...map]);
  }
  let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
  mapToArrayJson(myMap)  // '[[true,7],[{"foo":3},["abc"]]]'

  // 6 JSON 转为 Map

  // 6.1 JSON 转为 Map，正常情况下，所有键名都是字符串。
  function jsonToStrMap(jsonStr) {
    return objToStrMap(JSON.parse(jsonStr));
  }
  jsonToStrMap('{"yes": true, "no": false}') // Map {'yes' => true, 'no' => false}

  // 6.2 特殊情况，整个 JSON 就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。这时，它可以一一对应地转为 Map。这往往是 Map 转为数组 JSON 的逆操作。
  function jsonToMap(jsonStr) {
    return new Map(JSON.parse(jsonStr));
  }
  jsonToMap('[[true,7],[{"foo":3},["abc"]]]')
  // Map {true => 7, Object {foo: 3} => ['abc']}****

```
