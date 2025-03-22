import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Form, Input, message } from 'antd';
import { connect } from 'dva';
import styles from './assets/css/index.less';

const FormItem = Form.Item;

export interface RegisterProps {
  loading: boolean;
  form: any;
  dispatch: (val: any) => any;
}

const Register = ({
  loading,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}: RegisterProps) => {
  function handleOk() {
    validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        const { password, confirmPassword } = values;
        if (password !== confirmPassword) {
          message.error('请检查两次输入的密码是否一致');
          return;
        }
        dispatch({ type: 'user/register', payload: { ...values } });
      }
    });
  }
  function goToLogin() {
    dispatch({ type: 'global/routeChange', payload: { path: '/user/login' } });
  }
  return (
    <div className={styles.mark}>
      <div className={styles.form}>
        <div className={styles.logo}>
          <img alt="logo" src="https://rulifun.oss-cn-hangzhou.aliyuncs.com/blog/logo.png" />
          <span>Rulifun Blog</span>
        </div>
        <form>
          <FormItem hasFeedback>
            {getFieldDecorator('nickname', {
              rules: [
                { required: true, message: '请填写昵称' },
                {
                  pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5-]{2,20}$/,
                  message: '昵称应为2到20个字符，可以包含字母、数字、中文、下划线和连字符',
                }
              ],
            })(<Input size="large" onPressEnter={handleOk} placeholder="昵称" />)}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('email', {
              rules: [
                { required: true, message: '请填写邮箱' },
                {
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: '请输入有效的邮箱地址',
                },
              ],
            })(<Input size="large" type="email" onPressEnter={handleOk} placeholder="邮箱" />)}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: '请创建密码' },
                {
                  pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/,
                  message: '密码需包含至少8位字符，包括大小写字母、数字和特殊符号',
                },
              ],
            })(<Input size="large" type="password" onPressEnter={handleOk} placeholder="密码" />)}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('confirmPassword', {
              rules: [
                { required: true, message: '请确认密码' },
              ],
            })(<Input size="large" type="password" onPressEnter={handleOk} placeholder="确认密码" />)}
          </FormItem>
          <Row>
            <Button
              type="primary"
              size="large"
              onClick={handleOk}
              loading={loading}
            >注册账号
            </Button>
          </Row>
          <Row style={{ marginTop: 8 }}>
            <a className="login-tip" onClick={goToLogin}>已有账号？点这里登录</a>
          </Row>
        </form>
      </div>
    </div>
  );
};

Register.propTypes = {
  loading: PropTypes.bool,
  form: PropTypes.object,
  dispatch: PropTypes.func,
};

Register.defaultProps = {
  loading: false,
  form: {},
  dispatch: () => { },
};

function mapStateToProps({ app, loading }) {
  return {
    loading: loading.models.app,
    ...app,
  };
}

export default connect(mapStateToProps)(Form.create()(Register));
