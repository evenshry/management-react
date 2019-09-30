import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { CommonStore } from 'stores/common';
import { Container, Header } from 'components';

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

  componentDidMount() {}

  handleClick = () => {
    const { CommonStore } = this.injected;
    CommonStore.setToken('change token');
  };

  render() {
    const { loading, errMsg } = this.state;
    const { CommonStore } = this.injected;

    return (
      <Container loading={loading} errMsg={errMsg}>
        <section>
          <Header />
          <h2>这里是第二页</h2>
          <h3>{CommonStore.token}</h3>
        </section>
      </Container>
    );
  }
}

export default Index;
