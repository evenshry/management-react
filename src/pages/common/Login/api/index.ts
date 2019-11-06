import http from 'utils/http';
import { Http } from 'utils/http/interface';

type PromiseResp<T> = Promise<Http.ServerResponse<T>>;

/**
 * 登录
 */
export function login(params: Login.LoginParams): PromiseResp<Login.LoginResult> {
  return http.post('/login', params);
}
