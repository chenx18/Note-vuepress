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

## String 对象方法

```js

let str1 = 'HELLO WORLD';
let str2 = 'string';

// 1. toString()         返回一个字符串。
str1.toString();         // HELLO WORLD

// 2. toLowerCase()      把字符串转换为小写。
str1.toLowerCase();      // hello world

// 3. toUpperCase()      把字符串转换为大写。
str2.toUpperCase();      // STRING

// 4. charAt()          返回指定位置字符
str1.charAt(2);         // L

// 5. charCodeAt(index) 返回指定位置字符的unicode编码
str1.charCodeAt(0)      // 72

// 6. concat()          连接两个或更多字符串，并返回新的字符串
str1.concat(str2)       // HELLO WORLD string

// 7. indexOf()         返回某个指定字符串值在字符串中首次出现的位置
'String'.indexOf('i')   // 3

// 8. includes(searchSring,postion)  判断字符串是否包含指定的字符。(es6)
'string'.includes('g')               // true
'string'.includes('g',4)             // true

// 9. endsWith(searchSring, postion)  判断字符串是否以给定字符串结尾(es6)
'hello'.endsWith('e')        // false
'hello'.endsWith('e',2)      // true

// 10. startsWith(searchSring, postion) 判断字符串是否以给定字符串结尾(es6)
'hello'.startsWith('e')       // false
'hello'.startsWith('e',1)     // true

// 11. repeat()          复制字符串指定次数，并将它们连接在一起返回。(es6)
str2.repeat(2)          // stringstring

// 12. slice()           提取字符串的片断，并在新的字符串中返回被提取的部分。
str1.slice(1,5)         // ELLO

// 13. substring()      提取字符串中介于两个指定下标之间的字符。
'hello'.substring(1,3)  // el

// 14. substr()         提取指定下标开始指定长度的的字符串
'hello'.substr(1,2)     // el

// 15. split()          把字符串分割为字符串数组。
'str1'.split("")         // ["s", "t", "r", "1"]
'str1'.split(" ")        // ["str1"]
'str1 hfg'.split(" ")    // ["str1", 'hfg']

// 16. trim()           去除字符串两边的空白
str1.trim()             // HELLO WORD

// 17. trimStart()      消除字符串头部的空格  (ES2019)
str1.trimStart()

// 18. trimEnd()        消除尾部的空格(ES2019)
str1.trimEnd()


```

## 字符串遍历方法
