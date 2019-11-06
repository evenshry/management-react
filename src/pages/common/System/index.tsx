import React, { useEffect } from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import { HxSider } from 'components';
import { Layout, Breadcrumb } from 'antd';
import { getBreadcrumb } from 'routers/util';
import './style.less';

const { Content } = Layout;

interface Props {
  routes?: Array<HxRoute.RouteItem>;
}

function System(props: Props) {
  const { routes } = props;

  // 获取面包屑
  let breadcrumbLabels: string[] = [];
  if (routes) {
    breadcrumbLabels = getBreadcrumb(routes);
  }

  /**
   * 递归路由
   */
  function recursionRouter(routes: Array<HxRoute.RouteItem>) {
    return routes.map((router, index) => {
      if (router.component) {
        return (
          <Route
            key={index}
            exact={router.exact}
            strict={router.strict}
            path={router.path}
            render={(props) => {
              return <router.component {...props} routes={router.routes} />;
            }}
          />
        );
      } else {
        return router.routes && recursionRouter(router.routes);
      }
    });
  }

  return (
    <Layout>
      <HxSider routes={routes} />
      <Layout className="layout_main">
        <Breadcrumb className="layout_main_breadcrumb">
          {breadcrumbLabels.map((item, index) => (
            <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
          ))}
        </Breadcrumb>

        <Content className="layout_main_content">
          <HashRouter>
            <Switch>{routes && recursionRouter(routes)}</Switch>
          </HashRouter>
        </Content>
      </Layout>
    </Layout>
  );
}

export default System;
