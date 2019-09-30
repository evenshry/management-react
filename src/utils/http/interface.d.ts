import { AxiosRequestConfig } from 'axios';

declare namespace Http {
  /**
   * server端返回的数据格式
   */
  interface ServerResponse<T> {
    readonly apiStatus: number;
    readonly data: T;
    readonly info: string;
    readonly sysStatus: number;
    readonly timestamp: number;
  }

  /**
   * 配置
   */
  interface HttpRequestConfig extends AxiosRequestConfig {
    token?: string;
  }
}
