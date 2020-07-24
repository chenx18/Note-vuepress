# JavaScript String

## String 对象

- Stirng 对象用于处理文本（字符串）
- String 对象创建方法： new string();
- 属性：
  - constructor： 对创建该对象的函数的引用
  - length： 字符串的长度
  - prototype：允许您向对象添加属性和方法

```js
  var txt = new String("string");
  // 或者更简单方式：
  var txt = "string";
```

## String 常用方法

1. slice() 截取
```js
//  提取字符串的片断，并在新的字符串中返回被提取的部分
'HELLO'.slice(0,3)         // HEL
```

2. substr() 指定位置开始到指定长度
```js
//  提取指定下标开始指定长度的的字符串
'HELLO'.substr(1,3)         // ELL
```

3. substring() 两个索引之间
```js
//  提取字符串中介于两个指定下标之间的字符。
'HELLO'.substring(0,3)         // HEL
```

4. split() 分割 为字符串数组
```js
//  把字符串分割为字符串数组。
'str1'.split("")         // ["s", "t", "r", "1"]
'str1'.split(" ")        // ["str1"]
'str1 hfg'.split(" ")    // ["str1", 'hfg']
```

5. charAt()/charCodeAt() 指定位置字符
```js
// charAt() 返回指定位置字符
'str1'.charAt(2);  // r

// charCodeAt() 返回指定位置字符的unicode编码
'Hello'.charCodeAt(0)  // 72
```

6. concat() 连接 合并
```js
// 连接两个或更多字符串，并返回新的字符串
let str1 = 'HELLO WORLD';
let str2 = 'string';
str1.concat(str2)  // HELLO WORLD string
```

7. indexOf() 指定字符首次出现位置
```js
// 返回某个指定字符串值在字符串中首次出现的位置
let str1 = 'HELLO WORLD';
str1.indexOf('L')  // 2
```

8. includes() 是否包含指定字符
```js
// 连接两个或更多字符串，并返回新的字符串
'string'.includes('g')     // true
'string'.includes('g',4)   // true
```

9. endsWith() 是否指定字符串结尾(es6)
```js
// 判断字符串是否以给定字符串结尾(es6)
'hello'.endsWith('e')        // false
'hello'.endsWith('e',2)      // true
```

10. startsWith() 是否指定字符串开头(es6)
```js
// 判断字符串是否以给定字符串开头(es6)
'hello'.startsWith('e')        // false
'hello'.startsWith('e',2)      // true
```

11. trim()/trimStart()/trimEnd() 消除空格
```js
//  trim() 去除字符串两边的空白
' str1 '.trim()         // str1

// trimStart() 消除字符串头部的空格
' str1'.trimStart()   // str1

// trimEnd() 消除尾部的空格(ES2019)
'str1 '.trimEnd() // str1
```

12. toLowerCase()  转小写
```js
//  把字符串转换为小写。
let str1 = 'HELLO WORLD';
str1.toLowerCase();  // hello world
```

13. toUpperCase()  转大写
```js
// 把字符串转换为大写。
let str2 = 'string';
str2.toUpperCase();  // STRING
```

14. search()  执行一个查找
```js
// 正则方法
// 执行一个查找，看该字符串对象与一个正则表达式是否匹配
let str = "abc123def666";
console.log(str.search("1")); // 3
console.log(str.search(/[0-9]/)); // 3
```
15. replace() 比较并替换 被匹配的子串
```js
// 正则方法
// 被用来在正则表达式和字符串直接比较，然后用新的子串来替换被匹配的子串。
let str = "abc123def666";
console.log(str.replace("1", "-one-"));
console.log(str.replace(/\d/, "-one-"));
```
16. match()  提取匹配项
```js
// 当字符串匹配到正则表达式（regular expression）时
// match() 方法会提取匹配项
let str = "abc123def666";
console.log(str.match(/\d+/)); // ["123", index: 3, input: "abc123def666"]
console.log(str.match(/[0-9]/)); // ["1", index: 3, input: "abc123def666"]
```

## 字符串遍历方法
> 可使用for循环或for/in来遍历字符串，将索引值赋值给循环变量
```js
// 可使用for循环或for/in来遍历字符串，将索引值赋值给循环变量
var str = 'asd fgh'
for(var i = 0; i < str.length; i ++) {
    console.log(str[i])
}

for(var i in str) { console.log(str[i]) }
```
