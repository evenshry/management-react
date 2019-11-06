import React, { useEffect } from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import { RouteComponentProps, withRouter } from 'react-router';
import { HxHeader } from 'components';
import { Layout } from 'antd';
import './style.less';

interface Props extends RouteComponentProps {
  routes?: Array<HxRoute.RouteItem>;
}

function Index(props: Props) {
  const { routes, history } = props;

  useEffect(() => {
    const hash = window.location.hash;
    if (routes && routes.length > 0 && hash === '#/') {
      // 第一次进商家系统首页
      history.push('/business/home');
    }
  }, []);

  return (
    <Layout className="layout">
      <HxHeader routes={routes} />
      <HashRouter>
        <Switch>
          {routes &&
            routes.map((router, index) => (
              <Route
                key={index}
                exact={router.exact}
                strict={router.strict}
                path={router.path}
                render={(props) => {
                  return <router.component {...props} routes={router.routes} />;
                }}
              />
            ))}
        </Switch>
      </HashRouter>
    </Layout>
  );
}

export default withRouter(Index);
