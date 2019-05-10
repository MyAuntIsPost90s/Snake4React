import React from 'react';
import styles from './index.css';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {LocaleProvider} from 'antd';

class BasicLayout extends React.Component {
  public render() {
    return (
      <LocaleProvider locale={zhCN}>
        <div className={styles.body}>
          {this.props.children}
        </div>
      </LocaleProvider>
    );
  }
};

export default BasicLayout;
