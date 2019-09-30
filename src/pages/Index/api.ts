import http from 'utils/http';
import { Http } from 'utils/http/interface';

type PromiseResp<T> = Promise<Http.ServerResponse<T>>;

/**
 * 类目查询参数
 */
interface CategoryParams {
  type: string;
}

/**
 * 类目查询结果项
 */
interface CategoryItem {
  id: string;
  name: string;
}

/**
 * 查询类目
 */
export function fetchCategory(params: CategoryParams): PromiseResp<Array<CategoryItem>> {
  return http.post('/get/category', params);
}
