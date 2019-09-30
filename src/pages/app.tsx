import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'mobx-react';
import { HashRouter, Route } from 'react-router-dom';
import routers from 'routers';
import stores from 'stores';

import 'styles/common.less';

function App() {
  return (
    <Provider {...stores}>
      <HashRouter>
        {routers.map((router, index) => (
          <Route
            exact={router.exact}
            key={index}
            path={router.path}
            render={(props) => {
              return <router.component {...props} routes={router.routes} />;
            }}
          />
        ))}
      </HashRouter>
    </Provider>
  );
}

declare let module: object;

export default hot(module)(App);
