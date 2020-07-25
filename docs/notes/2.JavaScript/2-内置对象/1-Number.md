# Number方法

```js
  number : 数字 正数 负数 0 NaN 小数;
  NaN : not a number; 不是一个数字，但是属于数字类型的；
```

1. typeof :检测当前的数据类型的;
```js
  // 只能检测基本数据类型
  console.log(typeof 1);// "number"
  console.log(typeof "1");// "string"
  console.log(typeof true);// "boolean"
  console.log(typeof null);// "object"
  console.log(typeof undefined);// "undefined"
  console.log(typeof {});//"object"
  console.log(typeof []);//"object"
  console.log(typeof /\d/);//"object"
  console.log(typeof function(){});//"function"
```

2. isNaN : 强制转换成number，在判断
```js
  // isNaN 这个方法执行时，会先把要校验的值强制转换成number类型的；然后再进行判断；
  // 如果当前是一个有效的数字，那么返回false；
  // 如果不是一个有效的数字，返回结果true；
  console.log(isNaN(17));//false
  console.log(isNaN(1));//false
  console.log(isNaN(NaN));//true
  console.log(isNaN("1px"));//true
  console.log(isNaN("1"));//false
```

3. Number :将其他数据类型的值强制转换成number类型；
```js
  // 要把其他数据类型转换成number时，首先会调用toString；
  console.log(Number("1px"));//NaN
  console.log(Number("1"));//1
  console.log(Number({}));//NaN
  console.log(Number(null));// 0
  console.log(Number(undefined));// NaN
  console.log(Number([]));// 0
  console.log(Number(""));// 0
  console.log(Number(true));// 1
  console.log(Number(false));//0
```

4. parseInt 常用于字符串提取数字；
```js
 // 把字符串中从左到右依次识别，直到遇到一个非有效数字，停止，把找到的数字返回；
 // 如果第一个字符是非有效数字，那么直接返回NaN;
  console.log(parseInt("12px12"));// 12
  console.log(parseInt("12.666.777px12"));// 12
  console.log(parseInt("px12.666px12"));// NaN
  console.log(parseInt(""));// NaN
  console.log(parseInt(true));// NaN
  console.log(parseInt({}));// NaN
  console.log(parseInt([]));// NaN
  console.log(parseInt(null));// NaN
  console.log(parseInt(undefined));// NaN
```
 

5. parseFloat 和 parseInt 用法一样；区别是多识别一位小数点
```js
 console.log(parseFloat("12.666.7777px12"));//12.666
```

6. toFixed : 保留小数点位数的方法;返回值是一个字符串；
```js
  var num = 4.5;
  console.log(4.56.toFixed(2));
  console.log(num.toFixed(0));
```