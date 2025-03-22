import axios from 'axios';
import { TIME_OUT } from './config';

const service = axios.create({
  timeout: TIME_OUT, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    return {
      ...config,
      headers: {
        Token: token,
        ...config.headers,
      },
    };
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    const res = response;
    // 根据你的业务处理回调
    if (res.data.code !== 200) {
      if (res.data.code === 2005 || res.data.code === 2006 || res.data.code === 204) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      // 处理错误
      return res;
    } else {
      return res;
    }
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default service;
