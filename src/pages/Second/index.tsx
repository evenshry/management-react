import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Header from 'components/layouts/Header/index';
import { observer, inject } from 'mobx-react';
import { CommonStore } from 'stores/common';
import { fetchCategory } from 'pages/Index/api';
import Container from 'components/elements/Container';
import { Button } from 'antd';
import moment from 'moment';

interface Props {
  routes?: Array<HxRoute.RouteItem>;
}
interface Injected extends Props {
  CommonStore: CommonStore;
}
interface State {
  loading: boolean;
  errMsg: string;
}

@inject('CommonStore')
@observer
class Index extends Component<Props, State> {
  get injected() {
    return this.props as Injected;
  }

  state: Readonly<State> = {
    loading: false,
    errMsg: ''
  };

  componentDidMount() {
    fetchCategory({ type: '1' })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleClick = () => {
    const { CommonStore } = this.injected;
    CommonStore.setToken('change token');
  };

  render() {
    const { loading, errMsg } = this.state;
    const { CommonStore, routes } = this.injected;

    console.log(routes)

    return (
      <Container loading={loading} errMsg={errMsg}>
        <section>
          <Header />
          <h2>这里是第二页</h2>
          <h3>{CommonStore.token}</h3>
          <Button onClick={this.handleClick}>改变</Button>
          <div>{moment().format('YYYY-MM-DD')}</div>
          <HashRouter>
            {routes &&
              routes.map((router, index) => (
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
        </section>
      </Container>
    );
  }
}

export default Index;
