import styles from './index.css';

import React from 'react';
import {connect} from 'dva';
import DvaProp from "@/components/BaseProps/DvaProp";
import DvaState from "@/components/BaseProps/DvaState";
import {Layout, Input, Icon, Button, message} from 'antd';
import FormValid from '@/utils/FormValid';
import RouteUtil from '@/utils/RouteUtil';
import AuthUtil from "@/utils/AuthUtil";

interface IState {
  login: { username: string, password: string } | Record<string, string>
}

interface IProp extends DvaProp {
  user: any,
  inLogin: boolean
}

@connect((dvaState: DvaState | any) => {
  return {
    user: dvaState.user,
    inLogin: dvaState.loading.effects['user/login']
  }
})
export default class extends React.Component<IProp, IState> {

  state = {
    login: {
      username: '',
      password: ''
    }
  }

  private valid = {
    username: 'name:"用户名",notEmpty:true',
    password: 'name:"密码",notEmpty:true',
    e: ''
  }

  private onLogin = () => {
    if (!FormValid.check(this.state.login, this.valid)) {
      message.error(this.valid.e);
      return;
    }
    this.props.dispatch({
      type: 'user/login',
      payload: this.state.login
    }).then(resp => {
      if (resp) {
        AuthUtil.setAuth('admin');
        message.success('登陆成功');
        RouteUtil.link({path: '/index/course', history: this.props.history})
      }
    })
  }

  private onChange = (element: any) => {    //当不考虑性能时启用双向绑定简化操作
    if (!element.target.name || element.target.name === '') {
      return;
    }
    let data: Record<string, string> = this.state.login;
    data[element.target.name] = element.target.value;
    this.setState({
      login: data
    });
  }

  render() {
    const {Header, Content, Footer} = Layout;
    return (
      <Layout className={styles.loginTheme}>
        <Header style={{backgroundColor: 'transparent'}}></Header>
        <Content className={styles.loginThemeMain}>
          <div className={styles.title}>
            <img
              src={require('../../assets/logo.svg')}
              className={styles.logo}/>
            <span>Mini Ant Design</span>
            <em>v1.0.0.beta</em>
          </div>
          <div className={styles.desc}>即拆即用的后台框架</div>
          <div>
            <form onChange={this.onChange}>
              <div className={styles.loginBox}>
                <div>
                  <Input
                    name="username"
                    placeholder="请输入用户名"
                    size="large"
                    value={this.state.login.username}
                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}/>
                </div>
                <div>
                  <Input.Password
                    placeholder="请输入密码"
                    size="large"
                    name="password"
                    value={this.state.login.password}
                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}/>
                </div>
                <div>
                  <Button
                    loading={this.props.inLogin}
                    style={{width: '100%', fontSize: '16px'}}
                    type="primary"
                    size="large"
                    onClick={this.onLogin}>
                    登陆
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </Content>
        <Footer className={styles.loginThemeFooter}>Copyright 2019 cch</Footer>
      </Layout>
    )
  }

}
