# Date 常用方法

#### 1. 获取 年、月、日、时、分、秒、时差
- getYear(); 当前年份(2位)
- getFullYear(); 完整的年份(4位,1970-????)
- getMonth(); 当前月份(0-11,0代表1月)
- getDate(); 当前日(1-31)
- getDay(); 当前星期X(0-6,0代表星期天)
- getTime(); 当前时间(从1970.1.1开始的毫秒数)
- getHours(); 当前小时数(0-23)
- getMinutes(); 当前分钟数(0-59)
- getSeconds(); 当前秒数(0-59)
- getMilliseconds(); 当前毫秒数(0-999)
- getTimezoneOffset()  返回本地时间与格林威治标准时间 (GMT) 的分钟差（-480）
```js
var d = new Date();
d.getYear(); //获取当前年份(2位)
d.getFullYear(); //获取完整的年份(4位,1970-????)
d.getMonth(); //获取当前月份(0-11,0代表1月)
d.getDate(); //获取当前日(1-31)
d.getDay(); //获取当前星期X(0-6,0代表星期天)
d.getTime(); //获取当前时间(从1970.1.1开始的毫秒数)
d.getHours(); //获取当前小时数(0-23)
d.getMinutes(); //获取当前分钟数(0-59)
d.getSeconds(); //获取当前秒数(0-59)
d.getMilliseconds(); //获取当前毫秒数(0-999)
```

#### 2. 时间格式
- toLocaleDateString(); 把日期部分转换为字符串（2020/7/25）
- toLocaleTimeString()  把时间部分转换为字符串（下午1:45:02）
- toLocaleString()   把 Date 对象转换为字符串 （2020/7/25 下午1:45:23）
- toTimeString()    把时间部分转换为字符串(13:51:23 GMT+0800 (中国标准时间))
```js
// toLocaleDateString(); 把日期部分转换为字符串（2020/7/25）
new Date().toLocaleDateString()

// toLocaleTimeString()  把时间部分转换为字符串（下午1:45:02）
new Date().toLocaleTimeString()

// toLocaleString()   把 Date 对象转换为字符串 （2020/7/25 下午1:45:23）
new Date().toLocaleString()

// toTimeString()    把时间部分转换为字符串 (13:51:23 GMT+0800 (中国标准时间)
new Date().toTimeString()
```

#### 3. UTC时间格式字符串
- toISOString()  使用 ISO 标准返回字符串的日期格式（"2020-07-25T05:39:36.913Z"）
- toJSON()      以 JSON 数据格式返回日期字符串 （"2020-07-25T05:39:14.609Z"）
```js
// toISOString()  使用 ISO 标准返回字符串的日期格式（"2020-07-25T05:39:36.913Z"）
new Date().toISOString()

// toJSON()  以 JSON 数据格式返回日期字符串 （"2020-07-25T05:39:14.609Z"）
new Date().toJSON()
```

#### 4. 时间戳
- Date.UTC(y,M,D,h,m,s)  指定日期的毫秒数 Date.UTC(year,month,day,hours,minutes,seconds,millisec) (1333065600000)
- Date.parse(datestring) 指定日期的毫秒数(1332259200000)
- valueOf() 对象的原始值(new Date().valueOf() => 1595656866550)
```js
// Date.UTC(y,M,D,h,m,s)  指定日期的毫秒数
// Date.UTC(year,month,day,hours,minutes,seconds,millisec);
Date.UTC(2020, 25, 12)  // 1644624000000

//Date.parse(datestring) 指定日期的毫秒数(1332259200000)
// datestring: 表示日期和时间的字符串
Date.parse("2020-07-25");  //1595635200000
Date.parse("2020/07/25 12:30") // 1595651400000

//valueOf() 对象的原始值(new Date().valueOf() => 1595656866550)
new Date().valueOf();  // 1595658814492

```


#### 5. 设置时间

- setFullYear()	  设置 年份（四位数字）。
- setMonth()	  设置 月份 (0 ~ 11)。
- setDate()	  设置 某一天 (1 ~ 31)。
- setHours()	  设置 小时 (0 ~ 23)。
- setMinutes()	  设置 分钟 (0 ~ 59)。
- setSeconds()	  设置 秒钟 (0 ~ 59)。
- setMilliseconds()	  设置 毫秒 (0 ~ 999)。
- setTime()	  setTime() 方法以毫秒设置 Date 对象

```js
let _d = new Date();
_d.setFullYear(2021);
_d.setMonth(5);
_d.setDate(15);
_d.setHours(12);
_d.setMinutes(30);
_d.setSeconds(59);
_d.setMilliseconds(400);
console.log(_d) 
// Tue Jun 15 2021 12:30:59 GMT+0800 (中国标准时间)
```