import styles from './index.css';

import React from 'react';
import {Menu, Icon} from 'antd';
import BaseProp from "@/components/BaseProps/BaseProp";

interface CommonMenu extends BaseProp {
  onClick(e: any): void
}

export default class extends React.Component<CommonMenu> {

  public render() {
    return (
      <div>
        <div className={styles.title}>
          <img
            src={require('../../assets/logo.svg')}
            className={styles.logo}/>
          <h1>Mini Ant Design</h1>
        </div>
        <Menu onClick={this.props.onClick}
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['4']}>
          <Menu.SubMenu key="sub4"
                        title={<span><Icon type="setting"/><span>Navigation Three</span></span>}>
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key="sub5" title={<span><Icon type="setting"/><span>Navigation Three</span></span>}>
            <Menu.Item key="91">Option 9</Menu.Item>
            <Menu.Item key="101">Option 10</Menu.Item>
            <Menu.Item key="111">Option 11</Menu.Item>
            <Menu.Item key="121">Option 12</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="4">
            <Icon type="bar-chart"/>
            <span className="nav-text">nav 4</span>
          </Menu.Item>
          <Menu.Item key="5">
            <Icon type="cloud-o"/>
            <span className="nav-text">nav 5</span>
          </Menu.Item>
          <Menu.Item key="6">
            <Icon type="appstore-o"/>
            <span className="nav-text">nav 6</span>
          </Menu.Item>
          <Menu.Item key="7">
            <Icon type="team"/>
            <span className="nav-text">nav 7</span>
          </Menu.Item>
          <Menu.Item key="8">
            <Icon type="shop"/>
            <span className="nav-text">nav 8</span>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
};
