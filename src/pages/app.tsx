import React, { useEffect, useState, Fragment } from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'mobx-react';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { commonRoutes, systemRoutes } from 'routers';
import stores from 'stores';

import 'styles/variable.less';
import 'styles/common.less';

function App() {
  const token = localStorage.getItem('TOKEN');

  const [redirect, setRedirect] = useState<boolean>(false);

  useEffect(() => {
    if (!token || token == null) {
      setRedirect(true);
    }
  }, []);

  return (
    <ConfigProvider locale={zhCN}>
      <Provider {...stores}>
        <HashRouter>
          <Switch>
            {commonRoutes.concat(systemRoutes).map((router, index) => (
              <Route
                exact={router.exact}
                strict={router.strict}
                key={index}
                path={router.path}
                render={(props) => {
                  return <router.component {...props} routes={router.routes} />;
                }}
              />
            ))}
            {redirect ? <Redirect to="/login" /> : null}
          </Switch>
        </HashRouter>
      </Provider>
    </ConfigProvider>
  );
}

declare let module: object;

export default hot(module)(App);
