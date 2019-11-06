declare namespace common {
  /**
   * 分页参数
   */
  interface PageParams {
    pageIndex?: number;
    pageSize?: number;
    [key: string]: any;
  }

  /**
   * 分页结果
   */
  interface PageResult<T> {
    dataList?: T[];
    pageIndex?: number;
    pageSize?: number;
    total?: number;
  }
}
