import { useEffect, useState } from 'react';
import { Http } from 'utils/http/interface';

type APIFunc<T, P> = (params: P) => Promise<Http.ServerResponse<T>>;

/**
 * @param {api} —api.ts件中封装的接口请求方法
 * @param {defaultData} 页面初始化时接口数据的默认值
 * @param {params} 接口所需要的参数
 * @param {delay} 当该值为true时，接口不请求
 */
export function useInitial<T, P>(api: APIFunc<T, P>, defaultData: T, params: P, delay?: boolean) {
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(true);
  const [errMsg, setErrMsg] = useState<string>('');
  const [data, setData] = useState<T>(defaultData);

  useEffect(() => {
    if (!refreshing || delay) {
      return;
    }

    if (delay) {
      return;
    }

    api(params)
      .then((res) => {
        setData(res.data);
        setErrMsg('');
        setRefreshing(false);
        setLoading(false);
      })
      .catch((e) => {
        setErrMsg(e.message);
        setRefreshing(false);
        setLoading(false);
      });
  }, [refreshing, delay]);

  return {
    refreshing,
    errMsg,
    data,
    setData,
    setRefreshing,
    setErrMsg,
    loading
  };
}
