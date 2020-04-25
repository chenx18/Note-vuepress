# vue class style

## calss 绑定

1. 对象语法

   ```js
   <div :class="{ active: isActive }"></div>
   data: {
        isActive: true,
    }
   ```

2. 数组语法

   ```js
   <div :class="[activeClass, errorClass]"></div>
    data: {
        activeClass: 'active',
        errorClass: 'text-danger'
    }
   ```

3. 三元表达式

  ```js
  <div  :class="activeTab===item.tabIndex?'active':''"></div>
  
  ```

## style 绑定

1. 对象语法

   ```js
   <div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
   data: {
        activeColor: 'red',
        fontSize: 30
    }
   ```

2. 数组语法

   ```js
   <div :style="[baseStyles, overridingStyles]"></div>
    data: {
        baseStyles: {
            width:'100px',
        },
        overridingStyles:{
            height:'100px',
        }
    }
   ```

3. 三元表达式

  ```js
  <div  :style="activeTab===item.tabIndex?'baseStyles':''"></div>
  data: {
        baseStyles: {
            width:'100px',
        },
        overridingStyles:{
            height:'100px',
        }
    }
  
  ```
