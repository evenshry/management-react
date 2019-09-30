import React, { useState } from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'mobx-react';
import { HashRouter, Route } from 'react-router-dom';
import Container from 'components/elements/Container';
import Index from 'pages/Index/index';
import stores from 'stores';

import 'styles/common.less';

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>('');

  return (
    <Provider {...stores}>
      <HashRouter>
        <Container loading={loading} errMsg={errMsg}>
          <Route exact path="/" component={Index} />
        </Container>
      </HashRouter>
    </Provider>
  );
}

declare let module: object;

export default hot(module)(App);
