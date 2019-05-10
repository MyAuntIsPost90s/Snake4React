import styles from './index.css';
import React from 'react';
import {Icon, Dropdown, Menu} from 'antd';
import BaseProp from '../BaseProps/BaseProp';

interface CommonNav extends BaseProp {
  onUserInfoClick(e: any): void

  onFoldClick(e: any): void
}

export default class extends React.Component<CommonNav> {
  public render() {
    const menu = (
      <Menu style={{width: 180}}
            onClick={this.props.onUserInfoClick}>
        <Menu.Item key={'user'}>
          <a><Icon type={'user'}/> 个人中心</a>
        </Menu.Item>
        <Menu.Divider></Menu.Divider>
        <Menu.Item key={'logout'}>
          <a><Icon type={'logout'}/> 退出登陆</a>
        </Menu.Item>
      </Menu>
    );
    return (
      <div>
        <span className={styles.headerItem} onClick={this.props.onFoldClick}>
          <Icon type={'menu-fold'}/>
        </span>
        <span className={[styles.userInfo, styles.headerItem].join(' ')} style={{float: 'right'}}>
          <Dropdown overlay={menu}>
            <div>
              <img src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"/>
              <span className={styles.username}>ladyGaGa</span>
            </div>
          </Dropdown>
        </span>
      </div>
    );
  }
};
