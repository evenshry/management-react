import { useState, useEffect } from 'react';
import { PaginationConfig } from 'antd/lib/table';
import { Http } from 'utils/http/interface';

type APIFunction<T> = (params: common.PageParams) => Promise<Http.ServerResponse<common.PageResult<T>>>;

// 默认参数
const defaultParams: common.PageParams = {
  pageIndex: 1,
  pageSize: 15
};

/**
 * @param {api} —api.ts件中封装的接口请求方法
 * @param {params} 接口所需要的参数
 * @param {delay} 当该值为true时，接口不请求
 */
function usePagination<T>(api: APIFunction<T>, params: common.PageParams = {}, delay?: boolean) {
  const [loading, setLoading] = useState(true);
  const [innerParams, setInnerParams] = useState({ ...defaultParams, ...params });
  const [errMsg, setErrMsg] = useState('');
  const [list, setList] = useState();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!loading || delay) {
      return;
    }
    getListDataset(innerParams);
  }, [loading, delay]);

  function getListDataset(options: common.PageParams) {
    const params = setParams(options);
    return api(params)
      .then((res) => {
        if (res.data) {
          setList(res.data.dataList || []);
          setTotal(res.data.total || 0);
        }
        setErrMsg('');
      })
      .catch((e) => {
        setList([]);
        setErrMsg(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  /**
   * 内部缓存参数状态，innerParams
   * 当参数改变时，可能的场景是参数改变之后马上请求数据，或者参数改变之后，并不改变，等到点击确认按钮时才统一请求数据
   * 因此设置refreshing参数作为判断
   * refresing = true，时，直接请求接口
   */
  function setParams(options: common.PageParams = {}, refresing?: boolean) {
    const params = Object.assign({}, innerParams, options);
    setInnerParams(params);

    if (refresing) {
      setTimeout(() => {
        setLoading(true);
      }, 0);
    }
    return params;
  }

  /**
   * 分页器配置
   */
  const paginationConfig: PaginationConfig = {
    total,
    showSizeChanger: true,
    showQuickJumper: true,
    defaultPageSize: innerParams.pageSize,
    pageSizeOptions: ['15', '30', '50'],
    onChange: (pageIndex, pageSize) => {
      setParams({ pageIndex, pageSize }, true);
    },
    onShowSizeChange: (pageIndex, pageSize) => {
      setParams({ pageIndex, pageSize }, true);
    }
  };

  return {
    loading,
    setLoading,
    list,
    setList,
    errMsg,
    setErrMsg,
    params: innerParams,
    setParams,
    paginationConfig
  };
}

export default usePagination;
