import { AxiosRequestConfig } from 'axios';

declare namespace Http {
  /**
   * server端返回的数据格式
   */
  interface ServerResponse<T> {
    readonly apiStatus: string;
    readonly data: T;
    readonly info: string;
    readonly sysStatus: string;
    readonly timestamp: number;
  }

  /**
   * 配置
   */
  interface HttpRequestConfig extends AxiosRequestConfig {
    /**
     * 不验证
     */
    noAuth?: boolean;
  }
}
