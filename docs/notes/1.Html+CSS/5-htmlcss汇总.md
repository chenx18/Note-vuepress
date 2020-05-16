<!-- html css -->
#### HTML/CSS
<!-- 1. 折叠所有区域代码的快捷： ctrl + k      ctrl + 0 ; 先按下  ctrl 和 K，再按下 ctrl 和 0 ; ( 注意这个是零，不是欧 )-->

<!-- 2. 展开所有折叠区域代码的快捷：ctrl +k      ctrl + J ;  先按下  ctrl 和 K，再按下 ctrl 和 J   -->
#### 对WEB标准以及W3C的理解与认识
<details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  - 标签闭合、标签小写、不乱嵌套、提高搜索机器人搜索几率、使用外 链css和js脚本、结构行为表现的分离、文件下载与页面速度更快、内容能被更多的用户所访问、内容能被更广泛的设备所访问、更少的代码和组件，容易维 护、改版方便，不需要变动页面内容、提供打印版本而不需要复制内容、提高网站易用性。
  
  </details>

#### 前端页面有哪三层构成
  <details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

    结构层 Html 
    表示层 CSS 
    行为层 js
  
  </details>

#### Doctype的作用,严格模式与混杂模式如何区分
  <details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  - <!DOCTYPE> 声明位于文档中的最前面，处于 html 标签之前。告知浏览器的解析器，用什么文档类型 规范来解析这个文档  
    - **告诉浏览器按照何种规范解析页面**

  - 严格模式的排版和 JS 运作模式是  以该浏览器支持的最高标准运行。
  - 在混杂模式中，页面以宽松的向后兼容的方式显示。模拟老式浏览器的行为以防止站点无法工作。
  - DOCTYPE不存在或格式不正确会导致文档以混杂模式呈现

  </details>

#### HTML结构的语义化
  <details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  - html 语义化让页面的内容结构化，结构更清晰，便于对浏览器、搜索引擎解析; 
  - 用正确的标签做正确的事情。
  - 即使在没有样式 CSS 情况下也以一种文档格式显示，并且是容易阅读的
  - 搜索引擎的爬虫也依赖于 HTML 标记来确定上下文和各个关键字的权重，利于 SEO ;
  - 使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解。
  
  </details>

#### HTML 与 XHTML 区别
  <details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  - HTML 是超文本标记语言，主要是用于规定怎么显示网页。

  - XHTML 也是现在基本上所有网页都在用的标记语言，他其实和 HTML 没什么本质的区别，
    
  - 最主要不同
    - XHTML 元素必须被正确地嵌套。
    - XHTML 元素必须被关闭。
    - 标签名必须用小写字母。
    - XHTML 文档必须拥有根元素
  
  </details>

#### 盒子模型有哪些
  <details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  - 有两种盒模型，IE 盒子模型 和 标准 W3C 盒子模型；
  - w3c的盒模型 border和padding不占用content的实际宽高。
  - IE 的content部分包含了 border 和 pading;
  
  </details>

#### BFC认识
  <details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  - BFC （块级格式化上下文），一个创建了新的BFC 的盒子是独立布局的，盒子内元素的布局不会影响盒子外的元素。  
    在同一个 BFC 中的两个相邻的盒子在垂直方向发生 margin 重叠的问题

  - BFC 是指浏览器中创建了一个独立的渲染区域，该区域内所有元素的布局不会影响到区域外元素的布局，这个渲染区域只对块级元素起作用
  
  </details>

#### link和@import的区别
  <details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  - Link属于 html 标签，而 @import 是CSS中提供的
  - 在页面加载的时候，link 会同时被加载，而 @import 引用的 CSS 会在页面加载完成后才会加载引用的 CSS
  - @import 只有在 **ie5**以上才可以被识别，而 link 是 html 标签，**不存在浏览器兼容性问题**
  - Link 引入样式的权重大于 @import 的引用（@import 是将引用的样式导入到当前的页面中）
  
  </details>

#### 行内元素（inline）和 块元素（block）区别
  <details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  - 块级元素： 总是独占一行，宽度(width)、高度(height)、内边距(padding)和外边距(margin)都可控制;

  - 行内元素： 和相邻的行内元素在同一行，宽度(width)、高度(height)、内边距(padding)和外边距(margin)都不可改变
  
  </details>

#### 清除浮动的几种方式 
  <details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  - 浮动不在文档的普通流中，所以文档的普通流中的块框表现得就像浮动框不存在一样；可以向左或向右移动，直到它的外边缘碰到包含框或另一个浮动框的边框为止。
  - 清除方法
    1. 父级div定义 height （父级div手动定义height，就解决了父级div无法自动获取到高度的问题）
    2. 结尾处加空div标签 clear:both （添加一个空div，利用css提高的clear:both清除浮动，让父级div能自动获取到高度） 
    3. 父级div定义 伪类:after 和 zoom （浏览器支持好、不容易出现怪问题）
    4. 父级div定义 overflow:hidden （不能和position配合使用）

  </details>


#### 常见的几种居中的方法有
  <details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>
  
 
  1. 利用定位居中
  ```js
    // 方法一：已知元素的高宽
    #div1{
      background-color:#6699FF;
      width:200px;
      height:200px;
      position: absolute;        //父元素需要相对定位
      top: 50%;
      left: 50%;
      margin-top:-100px ;   //二分之一的height，width
      margin-left: -100px;
    }
    
    //方法二:未知元素的高宽
    #div1{
      width: 200px;
      height: 200px;
      background-color: #6699FF;
      margin:auto;
      position: absolute;        //父元素需要相对定位
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
    }

    // 垂直居中一个<img>
    #container { //<img>的容器设置如下
      display:table-cell;
      text-align:center;
      vertical-align:middle;
    }

  ```
  2. 利用了弹性盒居中
  ```js
    // 父元素div设置成弹性盒样式，
    // justify-content:center; 主轴居中（设置在父元素上）
    // align-items:center; 垂直居中（设置在父元素上）

    div{display:flex;justify-content:center;align-items:center;width:300px;height:400px;border:1px solid #000;margin:100px auto;}

    p{width:100px;height:100px;background:#f99;}
  ```
  3. 利用定位+动画移动属性transform
  ```js
   transform:translate(-50%,-50%);
  ```
  
  </details>

#### css优先级从高到低
  <details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  - !important >  id > class > 标签 
  - !important 比 内联优先级高

  - 优先级就近原则，样式定义最近者为准; 以最后载入的样式为准;

  </details>

#### CSS3 的 Flexbox（弹性盒布局模型），以及适用场景
  <details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  - flex 布局是 **CSS3 新增的一种布局方式**，我们可以通过将一个元素的 display 属性值设置为 flex , 从而使它成为一个 flex 容器，它的所有子元素都会成为它的项目。
  - 一个容器默认有两条轴，一个是**水平的主轴**，一个是与主轴 **垂直的交叉轴**。
    - 使用 **flex-direction** 来指定 **主轴的方向**
    - 使用 **justify-content** 来指定元素在 **主轴上的排列方式**，
    - 使用 **align-items**  来指定元素在 **交叉轴上的排列方式**
    - 使用 **flex-wrap** 来规定当一行排列不下时的 **换行方式**。
  
  </details>

#### CSS3新特性
  <details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

    过渡 transition
    动画 animation
    形状转换 transform
    阴影 box-shadow
    滤镜 Filter
    颜色 rgba
    栅格布局 gird
    弹性布局 flex
  
  </details>

#### html5新特性、移除了那些元素
  <details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  - 语义化更好的内容标签（header,nav,footer,aside,article,section）
  - 音频、视频API(audio,video)
  - 画布(Canvas) API
  - 地理(Geolocation) API
  - 本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失；
  - sessionStorage 的数据在浏览器关闭后自动删除

  - 移除的元素有：
    纯表现的元素：basefont，big，center，font, s，strike，tt，u;
    对可用性产生负面影响的元素：frame，frameset，noframes；
  
  </details>

#### html 常见兼容性问题
  <details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  1. 双边距BUG float引起的  使用display
  2. 3像素问题 使用float引起的 使用dislpay:inline -3px  
  3. 超链接hover 点击后失效  使用正确的书写顺序 link visited hover active
  4. Ie z-index问题 给父级添加position:relative
  5. Png 透明 使用js代码 改
  6. Min-height 最小高度 ！Important 解决’
  7. select 在ie6下遮盖 使用iframe嵌套
  8. 为什么没有办法定义1px左右的宽度容器（IE6默认的行高造成的，使用over:hidden,zoom:0.08 line-height:1px）
  9. IE5-8不支持opacity，解决办法：
    ```js
      .opacity {
        opacity: 0.4
        filter: alpha(opacity=60); /* for IE5-7 */
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)"; /* for IE 8*/
      }
    ```
  10. IE6不支持PNG透明背景，解决办法: IE6下使用gif图片
  
  </details>

#### css布局
  <details>
  <summary style="color: #3eaf7c;">
    <span style="cursor:pointer;color:#3eaf7c;font-size:14px;">解析</span>
  </summary>

  1. gird布局，layout布局，flex布局，双飞翼，圣杯布局等
  
  </details>
