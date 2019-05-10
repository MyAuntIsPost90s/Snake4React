import React from 'react';
import {Router} from 'dva/router';
import AuthUtil from '../../utils/AuthUtil';
import PageLoss from '../../pages/404';
import router from "../../../config/router";

export default class AuthRoute extends Router {

  constructor(props: any) {
    super(props);
  }

  // 获取路由权限
  private routeAuth = (): Array<string> | undefined => {
    let props: any = this.props;
    if (props && props.location) {
      let queue = [];
      queue.push(router[0]);
      while (queue.length > 0) {
        if (queue[0].path == props.location.pathname
          && !queue[0].routes) {
          return queue[0].authority;
        }
        if (queue[0].routes) {
          for (let i = 0; i < queue[0].routes.length; i++) {
            queue.push(queue[0].routes[i]);
          }
        }
        queue.splice(0, 1);
      }
      throw new Error('页面不存在');
    }
    return undefined;
  }

  render() {
    try {
      let currAuth = AuthUtil.getAuth();
      let routeAuth = this.routeAuth();
      if (routeAuth) {  //需要权限判断
        for (let i = 0; i < routeAuth.length; i++) {
          if (routeAuth[i] === currAuth) {  //权限通过则渲染
            return super.render();
          }
        }
        return (<PageLoss {...this.props}/>);  //权限不通过返回404
      } else {  //不需要权限
        return super.render();
      }
    } catch {
      return (<PageLoss {...this.props}/>);   //页面查询失败返回404
    }
  }
}

