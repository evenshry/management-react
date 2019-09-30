import React, { Component } from 'react';
import Header from 'components/layouts/Header/index';
import { observer, inject } from 'mobx-react';
import { CommonStore } from 'stores/common';
import { Button } from 'antd';
import { fetchCategory } from 'pages/Index/api';
import moment from 'moment';

interface Props {}
interface Injected extends Props {
  CommonStore: CommonStore;
}
interface State {}

@inject('CommonStore')
@observer
class Index extends Component<Props, State> {
  get injected() {
    return this.props as Injected;
  }

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
    const { CommonStore } = this.injected;
    return (
      <section>
        <Header />
        <h2>这里是首页</h2>
        <h3>{CommonStore.token}</h3>
        <Button onClick={this.handleClick}>改变</Button>
        <div>{moment().format('YYYY-MM-DD')}</div>
      </section>
    );
  }
}

export default Index;
