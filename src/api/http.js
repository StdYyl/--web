import axios from 'axios/index';
import {Message} from 'element-ui'

//默认最大请求时长
axios.defaults.timeout = 20000;
//默认url
axios.defaults.baseURL = '';

//http request拦截器
axios.interceptors.request.use(
  config => {
    // if(!config.isCheck) return config;
    //文件上传 跳过
    if (config.url.indexOf("getIntfDataByFile") == -1)
      config.data = JSON.stringify(config.data);
    config.headers = {
      'Content-Type': 'application/json;charset=utf-8',
      'token': localStorage.getItem("token"),
    }
    // 根据请求路径处理content-type
    if (config.url.includes('/export')) {
      config.headers['responseType'] = 'blob'
    }
    // 根据请求路径处理content-type
    if (config.url.includes('/upload') || config.url.includes('/getIntfDataByFile')) {
      config.headers['Content-Type'] = 'multipart/form-data'
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

//http response拦截器
axios.interceptors.response.use(
  response => {
    if (response.status != 200) {
      Message.error('请求失败!');
    }
    return response;
  },
  err => {
    return Promise.reject(err);
  }
);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params,
    }).then(response => {
      resolve(response);
    }).catch(err => {
      reject(err);
    })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(response => {
      resolve(response);
    }).catch(err => {
      reject(err);
    })
  })
}
