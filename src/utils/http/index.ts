import axios from 'axios';
import { Http } from './interface';
import { message } from 'antd';

type req = Http.HttpRequestConfig;

// 请求地址
axios.defaults.baseURL = 'https://yjhw-pub.servicesplus.cn/api';

/**
 * 请求头信息拦截调整
 */
axios.interceptors.request.use(
  async (config: req): Promise<req> => {
    if (!config.timeout) {
      config.timeout = 30 * 1000;
    }
    // 给每个请求新增时间戳
    config.params = Object.assign({ _s: Date.now() }, config.params);

    if (config.token) {
      const token = localStorage.getItem('TOKEN');
      config.headers['X-Hanxi-Token'] = token;
    }
    return config;
  }
);

// 错误枚举
const ERROR_MSG: { [key: number]: string } = {
  500: '500, 服务器异常，请稍后再试',
  502: '502, 网关异常，请稍后再试',
  503: '抱歉，当前服务器异常，请稍后再试',
  504: '服务器响应超时',

  401: '抱歉，您还未登录',
  403: '抱歉，您没有权限访问该页面',
  404: '抱歉，请求走丢了'
};

/**
 * 请求头信息拦截调整
 */
axios.interceptors.response.use(
  (response): any => {
    console.log('success', response);
    const result = response.data || {};
    // 非成功状态提示
    if (result.apiStatus !== 0 || result.sysStatus !== 0) {
      message.error(result.info || '出错了，请重试！');
    }
    return result;
  },
  (error) => {
    /* TODO 对响应错误做点什么 */
    console.log('error', error);
    if (error.data && !error.data.info) {
      const code: number = error.statusCode || 404;
      error.data.info = ERROR_MSG[code] || '发生了预期之外的错误';
    }
    const result = error.response.data || {};
    message.error(result.info || '出错了，请重试！');
    if (result.sysStatus !== 0 && result.sysStatus !== 1005) {
      // TODO 跳转登录
    }
    return Promise.reject(error);
  }
);

export function get<T>(url: string, config?: req): Promise<Http.ServerResponse<T>> {
  return axios.get(url, config);
}

export function post<T>(url: string, params: any, config?: req): Promise<Http.ServerResponse<T>> {
  return axios.post(url, params, config);
}

export function put<T>(url: string, params: any, config?: req): Promise<Http.ServerResponse<T>> {
  return axios.put(url, params, config);
}

export function _delete<T>(url: string, config?: req): Promise<Http.ServerResponse<T>> {
  return axios.delete(url, config);
}

const http = {
  get,
  post,
  put,
  delete: _delete
};

export default http;
