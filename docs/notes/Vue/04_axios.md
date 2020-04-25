# vue-axios基础使用（axios简介、基本方法、拦截器、axios安装、axios导入挂载、axios封装、文件下载、文件上传）

[axios中文说明](https://www.kancloud.cn/yunye/axios/234845)

## 1. axios简介

> Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中

***1.1 基本特征***

```md
# axios 是一个基于Promise 用于浏览器和 nodejs 的 HTTP 客户端，它本身具有以下特征：
- 从浏览器中创建 XMLHttpRequest
- 从 node.js 发出 http 请求
- 支持 Promise API
- 拦截请求和响应
- 转换请求和响应数据
- 取消请求
- 自动转换JSON数据
- 客户端支持防御 CSRF/XSRF
```

***1.2 基本方法***

- GET请求  
- POST请求  
- 执行多个并发请求 (处理并发请求的助手函数 axios.all(iterable)/axios.spread(callback))
- 拦截器 (在请求或响应被 then 或 catch 处理前拦截它们。)
  
***1.3 方法请求方法别名***

```md
axios.request(config)
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])
NOTE
在使用别名方法时， url、method、data 这些属性都不必在配置中指定。
```

***1.4 并发***

```md
处理并发请求的助手函数

axios.all(iterable)
axios.spread(callback)
```

***1.5 拦截器***

- 请求拦截器（interceptors.requst）：可以拦截每次或指定HTTP请求，并可修改配置项；
- 响应拦截器（interceptors.response）：可以在每次HTTP请求后拦截每次或指定HTTP请求，并可修改返回结果项；
  
<!-- ![拦截器工作流程](./../../assets/img/vue-img/13893707-46250b82c3161def.webp) -->

## 2. 安装axios

```js
  npm install axios --save   // 安装
```

## 3. vue-axios引入

***3.1.在主入口文件main.js中引用***

```js
  // 首先在在主入口文件main.js中引用,然后挂在vue的原型链上 (推荐使用)
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  Vue.use(VueAxios,axios);
```

***3.2.axios 改写为 Vue 的原型属性***

```js
  // 首先在主入口文件main.js中引用，然后挂在vue的原型链上（不推荐）
  import axios from 'axios'
  Vue.prototype.$axios= axios

  //在组件中使用
  this.$axios.get('api/getNewsList').then((response)=>{
    this.newsList=response.data.data;
  }).catch((response)=>{
    console.log(response);
  })
```

## 4. 封装vue-axios

- 在utils中创建一个http.js用于封装axios;  
- 在src下创建一个api文件用于存放各类API;  
- 在组件中直接导入API模块使用;  

***4.1 http.js中封装axios***

  ```js
  import { Toast } from 'vant';
  import axios from 'axios';
  import qs from 'qs';
  //Toast()方法，引入的vant库中的toast轻提示组件，提示响应拦截出错误。
  /**
   * 设置请求超时
   */
  axios.defaults.timeout = 5000;
  // axios.defaults.baseURL ='';

  /**
   * 环境的切换
   * 项目环境可能有开发环境、测试环境和生产环境;
   * 通过node的环境变量来匹配我们的默认的接口url前缀
   * axios.defaults.baseURL可以设置axios的默认请求地址
   */
  // if (process.env.NODE_ENV == 'development') {
  //   axios.defaults.baseURL = 'https://www.baidu.com';}
  //  else if (process.env.NODE_ENV == 'debug') {
  //   axios.defaults.baseURL = 'https://www.ceshi.com';
  //  }
  //  else if (process.env.NODE_ENV == 'production') {
  //   axios.defaults.baseURL = 'https://www.production.com';
  //  }


  /**
   * 请求拦截器
   * 暂时未使用登陆功能
   */
  axios.interceptors.request.use(
    config => {
      // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
      // config.data = JSON.stringify(config.data);
      // if(token){
      //   config.params = {'token':token}
      // }
      return config;
    },
    error => {  
    return Promise.error(error);
    })
  /**
    * 响应拦截器
    */
  axios.interceptors.response.use(
    response => {  
    if (response.status === 200) {
      return Promise.resolve(response);  
    } else {
      return Promise.reject(response);  
    }
    },
    // 服务器状态码不是200的情况
    error => {  
    if (error.response.status) {
      switch (error.response.status) {
      // 401: 请求未经授权
      // 未登录则跳转登录页面，并携带当前页面的路径
      // 在登录成功后返回当前页面，这一步需要在登录页操作。
      case 401:
        router.replace({
        path: '/home',
        query: { redirect: router.currentRoute.fullPath }  //从哪个页面跳转
        });
        break;
      // 403 服务器收到请求，但是拒绝提供服务 (token过期  )  
      // 登录过期对用户进行提示
      // 清除本地token和清空vuex中token对象
      // 跳转登录页面
      case 403:
        Toast({
        message: '登录过期，请重新登录',
        duration: 1000,
        forbidClick: true
        });
        // 清除token
        // localStorage.removeItem('token');
        // store.commit('loginSuccess', null);
        // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
        setTimeout(() => {
        router.replace({
          path: '/home',
          query: {
          redirect: router.currentRoute.fullPath
          }
        });
        }, 1000);
        break;
      // 404 请求资源不存在(请求不存在)
      case 404:
        Toast({  
        message: '网络请求不存在',
        duration: 1500,
        forbidClick: true
        });
      break;
      // 其他错误，直接抛出错误提示
      default:
        Toast({
        message: error.response.data.message,
        duration: 1500,
        forbidClick: true
        });
      }
      return Promise.reject(error.response);  
    }  
    }
  );

  export default {
    /**
      * get方法，对应get请求
      * @param {String} url [请求的url地址]
      * @param {Object} params [请求时携带的参数]
      */
    get(url, params){
      return axios({
        method: 'get',
        url,
        params
      });
    },

    /**
      * get方法，对应get请求
      * @param {String} url [请求的url地址]
      * @param {Object} params [请求时携带的参数]
      */
    getFile(url, params){
      return axios({
        method: 'get',
        url,
        params,
        headers:{
          'Content-Type': 'application/json; application/octet-stream'
        },
        responseType: 'blod',
      });
    },

    /** 
      * post方法，对应post请求
      * @param {String} url [请求的url地址]
      * @param {Object} data [请求时携带的参数]
      */
    post(url,data) {
      return axios({
        method: 'post',
        url,
        data: data,
        headers: {'Content-Type': 'application/json'}
      });
    },

    /**上传文件
      * @param {String} url [请求的url地址]
      * @param {String} data [请求时携带的文件]
      */
    postFile(url, data) {
      return axios({
        method: 'post',
        url,
        data: data,
        anync:true,
        contentType:false,
        processData: false,
        headers: {'content-type': 'multipart/form-data'+ + new Date().getTime()}
      })
    }

  }
  ```

***4.2 api.js中使用封装好的axios***

  ```js
  import http from './http'
  class Todos {
    constructor() {};
    GetTodoList = params => {
      return http.get('/api/Todos/GetList', params);
    }
    AddTodos = params => {
      return http.post('/api/Todos/Add', params);
    }
    UpUserICON = (data) => {
      return http.postFile('/api/User/UpUserICON', data)
    }
    DownloadIcon = params => {
      return http.get('/api/User/Download',params);
    }
  }

  export default new Todos;

  ```

***4.3 组件中使用axios***

  ```js
  // 在组件中其实我们只需要导入写好的API模块，在API模块中已经使用了axios模块
    import Api from './../utils/api.js';
    import fileDownload from './../utils/download.js'
    import { Uploader  } from 'vant';
    export default {
      name: 'about',
      data() {
        return {
          title: '我的',
        }
      },
      mounted() {},
      methods: {
        // 查询
        getInfo() {
          Api.GetTodoList().then(res => {
            console.log(res);
            if(res.data.Code === 1) {
              this.infoData = res.data.Data[0];
              console.log(this.infoData);
            }
          })
        },
        // 上传
        async UpUserICON(val) {
          if(val) {
            let formdata = new FormData();
            formdata.append("file", val.file)
            await Api.UpUserICON(formdata).then(res => {
              if(res.data.Code === 1) {
                this.getInfo();
              }
            })
          }
        },
        // 下载
        downloadIcon() {
          let name = this.infoData.Icon.substring(22);
          let params = {name};
          Api.DownloadIcon(params).then(res => {
            if(res && res.data) {
              fileDownload.downloadImg(res, params.name)
            }
          })
        }
      }
    }
  ```

***4.4 axios 的流文件下载封装***
  [axios 的流文件下载](https://blog.csdn.net/ko_in_5/article/details/85335702)

  ```js
  export default {
    download (data, name, isStream) {
      try{
        const type = isStream ? 'applicatoin/octet-stream' : 'application/1vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        const blob = new Blob([data], {type});
        if(navigator.msSaveOrOpenBlob) {
          navigator.msSaveOrOpenBlob(blob, name);
        }else {
          const objectUrl = URL.createObjectURL(blob);
          document.body.appendChild(a);
          a.setAttribute('style', 'display: none');
          a.setAttribute('href', objectUrl);
          a.setAttribute('download', name);
          a.click();
          a.remove();
          URL.revokeObjectURL(objectUrl);
        }
      } catch {
        console.log('下载失败！');
      }
    },
    downloadImg(res, fileName) {
      if (!res) return;
      // let url='data:image/jpg;base64,'+ btoa(
      // new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
      // let blob = new Blob([res.data])
      // let url = window.URL.createObjectURL(blob);
      // let url = res.data.Data;
      console.log(url);
      var link = document.createElement('a');
      link.style.display = 'none';
      link.href = url;
      link.download = fileName;
      link.target = '_b'
      link.click()
      link.remove()
    }
  }
  ```
