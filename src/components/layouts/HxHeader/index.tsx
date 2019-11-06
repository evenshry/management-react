import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Layout, Menu, Button, Modal, message } from 'antd';
import { getCurrentPath } from 'routers/util';
import './style.less';

const { Header } = Layout;
const { confirm } = Modal;

const logo = require('assets/images/logo.jpg');

interface Props extends RouteComponentProps {
  routes?: Array<HxRoute.RouteItem>;
}

function HxHeader(props: Props) {
  const { routes, history } = props;

  function handleSelect({ key }) {
    history.push(`${key}/home`);
  }

  function handleLogout() {
    confirm({
      title: '提示',
      content: '确认退出韩希甄选商家端？',
      onOk() {
        localStorage.removeItem('TOKEN');
        localStorage.removeItem('username');
        localStorage.removeItem('sellerId');
        localStorage.removeItem('shopId');
        history.replace('/login');
        message.success('退出成功!');
      }
    });
  }

  // 当前路由路径
  const currentPath = getCurrentPath(1);

  return (
    <Header className="hxHeader">
      <div className="logo" style={{ backgroundImage: `url(${logo})` }} />
      <h1>可视化管理</h1>
      {routes && routes.length > 0 ? (
        <Menu mode="horizontal" defaultSelectedKeys={[currentPath]} className="menu" onClick={handleSelect}>
          {routes.map((router) => {
            return router.isMenu ? <Menu.Item key={router.path}>{router.title}</Menu.Item> : null;
          })}
        </Menu>
      ) : null}

      <div className="userInfo">
        <span className="label">{localStorage.getItem('username') || ''}</span>
        <Button type="link" icon="poweroff" onClick={handleLogout}>
          退出登录
        </Button>
      </div>
    </Header>
  );
}

export default withRouter(HxHeader);
