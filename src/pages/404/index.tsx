import styles from './index.css';
import React from 'react';
import {Layout, Button} from 'antd';
import RouteUtil from "@/utils/RouteUtil";
import BaseProp from "@/components/BaseProps/BaseProp";

export default class extends React.Component<BaseProp> {

  constructor(props: any) {
    super(props);
    console.log(props);
  }

  private backIndex = () => {
    RouteUtil.link({
      path: '/index/course',
      history: this.props.history
    })
  }

  render() {
    return (
      <Layout className={styles.bg}>
        <Layout.Content className={styles.bg}>
          <div className={styles.imgBox}>
            <img src={require("../../assets/404.svg")}/>
          </div>
          <div className={styles.txtContent}>
            <h1>404</h1>
            <div className={styles.desc}>抱歉，你访问的页面不存在</div>
            <div className={styles.action}><Button type="primary" onClick={this.backIndex}>返回首页</Button></div>
          </div>
        </Layout.Content>
        <Layout.Footer>Copyright 2019 cch</Layout.Footer>
      </Layout>
    )
  }
}
