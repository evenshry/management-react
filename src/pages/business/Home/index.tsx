import React from 'react';
import { Layout } from 'antd';
import './style.less';

interface Props {}

function Index(props: Props) {
  return (
    <Layout className="layout">
      <h1>这里是商家系统首页</h1>
    </Layout>
  );
}

export default Index;
