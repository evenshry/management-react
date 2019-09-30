import React from 'react';
import { Icon } from 'antd';

import './style.less';

export type ExceptionType = 'default' | 'accessDenied' | 'dataFault' | 'noData' | 'noMessage' | 'noSearch' | 'pageLost' | 'timeOut';

const imageSource: { [key: string]: any } = {
  default: {
    message: '暂无相关内容~'
  },
  accessDenied: {
    message: '暂无访问权限~'
  },
  dataFault: {
    message: '获取数据失败~'
  },
  noData: {
    message: '暂无相关数据~'
  },
  noMessage: {
    message: '暂无任何消息~'
  },
  noSearch: {
    message: '暂无搜索结果~'
  },
  pageLost: {
    message: '页面走丢了~'
  },
  timeOut: {
    message: '当前网络不给力，请下拉刷新~'
  }
};

export interface ExceptionProps {
  height?: number;
  message?: string;
  type?: ExceptionType;
  children?: any;
}

function Exception({ height, type = 'default', message, children }: ExceptionProps) {
  return (
    <section className="exception" style={height ? { height: `${height}rpx` } : {}}>
      <Icon type="exclamation-circle" />
      {message ? <span className="text">{message}</span> : <span className="text">{imageSource[type].message}</span>}
      <span className="text">{children}</span>
    </section>
  );
}

export default Exception;
