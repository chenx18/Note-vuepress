# Math 函数的常用方法

> Math 是数学函数，但又属于对象数据类型 typeof Math => 'object'  
> console.dir(Math) 查看Math的所有函数方法。  

1. Math.abs() 获取绝对值
```js
Math.abs(-12) = 12
```

2. Math.ceil()/Math.floor() 向上取整和向下取整
```js
 console.log(Math.ceil(12.03));//13
 console.log(Math.ceil(12.92));//13
 console.log(Math.floor(12.3));//12
 console.log(Math.floor(12.9));//12
```

3. Math.round() 四舍五入 
```js
  // 注意：正数时，包含5是向上取整，负数时包含5是向下取整。
  Math.round(-16.3) = -16
  Math.round(-16.5) = -16
  Math.round(-16.51) = -17
```

4. Math.random() 随机数 
```js
  Math.random() // 取[0,1)的随机小数 

  // 案例1：获取[0,10]的随机整数
  console.log(parseInt(Math.random()*10));//未包含10
  console.log(parseInt(Math.random()*10+1));//包含10
  // 案例2：获取[n,m]之间的随机整数
  Math.round(Math.random()*(m-n)+n)
```

5. Math.max()/Max.min() 最大值和最小值
```js
  // 获取一组数据中的最大值和最小值
  console.log(Math.max(10,1,9,100,200,45,78));
  console.log(Math.min(10,1,9,100,200,45,78));
```

6. Math.PI 获取圆周率π 的值
```js
  console.log(Math.PI);
```

7. Math.pow()/Math.sqrt() 
```js
Math.pow()  // 获取一个值的多少次幂 
Math.sqrt() // 对数值开方

Math.pow(10，2) = 100;
Math.sqrt(100) = 10;
```

```js
//例子:自己定义一个对象,实现系统的max的方法
function Mymax() {
  //添加了一个方法
  this.getMax = function () {
    //假设这个数是最大值
    var max = arguments[0];
    for (var i = 0; i < arguments.length; i++) {
      if (max < arguments[i]) {
        max = arguments[i];
      }
    }
    return max;
  };
}
// 实例对象
var my = new Mymax();
console.log(my.getMax(9, 5, 6, 32));
console.log(Math.max(9, 5, 6, 32));
```