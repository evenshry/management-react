import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { login } from './api';
import './style.less';

const homeIcon = require('assets/images/logo_n.jpg');

interface Props extends FormComponentProps, RouteComponentProps {}

function Index(props: Props) {
  const { form, history } = props;
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * 提交登录
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        setLoading(true);
        try {
          const response = await login({
            phoneNumber: values.phoneNumber,
            password: values.password
          });
          const data: Login.LoginResult = response.data || {};
          localStorage.setItem('TOKEN', data.token || '');
          localStorage.setItem('username', data.username || '');
          localStorage.setItem('sellerId', data.sellerId || '');
          localStorage.setItem('shopId', data.shopId || '');
          message.success('登录成功!');
          history.replace('/');
          setLoading(false);
        } catch (event) {
          setLoading(false);
        }
      }
    });
  };

  return (
    <div className="hx-login-container">
      <div className="hx-login-bg-top">
        <div className="hx-login-logo">
          <img src={homeIcon} alt="" />
        </div>
      </div>

      <div className="hx-login-template">
        <Form {...formItemLayout} className="hx-login-template-form" onSubmit={handleSubmit}>
          <Form.Item label="手机：">
            {form.getFieldDecorator('phoneNumber', {
              rules: [
                { required: true, message: '请输入11位手机号' },
                { pattern: /^1[3|4|5|7|8|9][0-9]\d{4,8}$/, message: '请输入正确的手机号' }
              ]
            })(
              <Input
                type="text"
                maxLength={11}
                placeholder="请输入手机号"
                size="large"
                className="login_input"
                onPressEnter={handleSubmit}
              />
            )}
          </Form.Item>

          <Form.Item label="密码：">
            {form.getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码' }]
            })(
              <Input
                type="password"
                minLength={6}
                maxLength={16}
                placeholder="请输入密码"
                size="large"
                className="login_input"
                onPressEnter={handleSubmit}
              />
            )}
          </Form.Item>

          <section className="ant-form-item fromRow">
            <Button loading={loading} disabled={loading} type="primary" htmlType="submit" className="login_btn" size="large">
              登录
            </Button>
          </section>

          <section className=".ant-form-item fromRow">
            <Button type="link" className="hx-link-reg">
              立即注册
            </Button>

            <Button type="link" className="hx-link-fog">
              忘记密码？
            </Button>
          </section>
        </Form>
      </div>

      <div className="hx-login-bg-footer"></div>
    </div>
  );
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 }
  }
};

// 高价组件-集成路由和表单
export default Form.create()(withRouter(Index));
