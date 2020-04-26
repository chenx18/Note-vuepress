#### 数据请求

<a href="https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html">网络请求</a>

> 微在信中提供了API的调用wx.request(OBJECT)发起 HTTPS 网络请求

#### 封装网络请求

##### 1. http.js (untils)

```js
// 请求方式的配置
const Api = "https://xxxxxxxxxxxx";
export default {
  /**
   * post请求封装
   * @param {*} url
   * @param {*} data
   */
  post(url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: Api + url,
        data: data,
        method: 'POST',
        success: res => {
          resolve(res);
        },
        fail: err => {
          reject(err)
        }
      })
    })
  },
  
  /**
   * GET请求封装
   * @param {*} url
   * @param {*} data
   */
  get(url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: Api + url,
        data: data,
        method: 'GET',
        success: res => {
          resolve(res);
        },
        fail: err => {
          reject(err)
        }
      })
    })
  }
}
```

##### 2. api.js (untils)

```js
import http from './http';

class Api {
  constructor() {}
  // 登录
  Logining = (data) => {
    return http.post(`/Api/PostLogin`, data);
  }
}

export default new Api;
```

##### 3. 页面中使用

```js
import http from './../../utils/api';
loging(){
    wx.showLoading({
      title: '正在登录',
    });
    const params = {};
    http.Logining(params).then(res => {
      wx.hideLoading();
      if (res.data) {
          console.log(res)
      } else {
        wx.showToast({ title:'没有数据', icon: 'none' })
      }
    }).catch(err => {
      wx.hideLoading()
      wx.showToast({ title: err.errMsg, icon: 'none'})
    })
}

```
