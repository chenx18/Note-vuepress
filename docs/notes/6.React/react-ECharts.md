## ECharts
[ECharts 官网](http://echarts.baidu.com/index.html)
  > ECharts，一个使用 JavaScript 实现的开源可视化库，可以流畅的运行在 PC 和移动设备上，兼容当前绝大部分浏览器（IE8/9/10/11，Chrome，Firefox，Safari等），底层依赖轻量级的矢量图形库 ZRender，提供直观，交互丰富，可高度个性化定制的数据可视化图表。以下是在react中使用ECharts。

##### 安装
```js
npm install echarts --save
// 这个时候我们的ECharts就被下载到项目中的node_modules文件夹中，
// 这个时候我们就可以在编写的react组件中使用ECharts了，下面直接看代码：
```
##### 使用
    1. 主模块: 在需要使用的文件引入 echarts 主模块；
    2. 组件: 引入相应的组件（如提示框 、标题组件）；
    3. 类型: 引入你需要使用的图标类型，下面代码引入了饼状图和折线图；
    4. 容器: 为 ECharts 准备一个具备大小（宽高）的 DOM ；
    5. 以上准备好就可以配置我们的图表，具体配置参数移步至 官网（ http://echarts.baidu.com/index.html ）
**示例效果：**
![echart.png](./../assets/images/echart-img.png "示例效果")

**完整示例代码如下**
```js
import React, { Component } from 'react';
import { Card } from 'antd';
import echarts from 'echarts';  // 引入echarts主模块
import 'echarts/lib/component/tooltip'; // 引入提示框
import 'echarts/lib/component/title'; // 引入标题组件
import 'echarts/src/chart/pie'; // 引入饼状图。
import 'echarts/src/chart/line'; // 引入折线图。

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Home',
    }
  }
  componentDidMount() {
    // 绘制饼状图。
    let pieEChart = echarts.init(this.refs.pieEChart);
    pieEChart.setOption({
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        right: '10%',
        bottom: 220,
        data: ['行驶', '正常','离线','未使用']
      },
      series: {
        type: 'pie',
        radius : '70%',
        center: ['40%', '50%'],
        selectedMode: 'single',
        data: [
          {name: '行驶', value: 1212},
          {name: '正常', value: 2323},
          {name: '离线', value: 1919},
          {name: '未使用', value: 1919},
        ]
      },
    });
    
    // 绘制折线图
    let lineEChart = echarts.init(this.refs.lineEChart);
    lineEChart.setOption({
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data:['安装量','安装车辆数'],
        left: 30
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['1','2','3','4','5','6','7','8','9','10','11','12']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name:'安装量',
          type:'line',
          stack: '总量',
          data:[120,132,101,134,90,230,210,120,132,101,134,90, 230]
        },
        {
          name:'安装车辆数',
          type:'line',
          stack: '总量',
          data:[220,182,191,234,290,330,310,220,182,191,234,290,330]
        }
      ]
    });

    // 设置图表自适应
    window.onresize = () => {
      pieEChart.resize();
      lineEChart.resize ();
    }
  }
  
  render() {
    return(
      <div className="home">
        <Card  title="离线/在线统计"  className="echart-card">
          {/**为 ECharts 准备一个具备大小（宽高）的 DOM  */}
          <div ref="pieEChart" style={{width:'100%',height:500}}></div>
        </Card>
        <Card  title="装机统计"  className="echart-card">
          {/**为 ECharts 准备一个具备大小（宽高）的 DOM  */}
          <div ref="lineEChart" style={{width:'100%',height:500}}></div>
        </Card>
      </div>
    )
  }
}
export default Home;
```