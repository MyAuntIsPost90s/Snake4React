import {message} from 'antd';
import Constant from '../../config/constant';

const HeaderType = {
  URL_ENCODED: 'application/x-www-form-urlencoded',
  JSON: 'application/json'
}

export interface Request {
  url: string,
  headers?: Record<string, string>
  data?: any
}

export interface ResponseData {
  code: number,
  msg?: string
  data?: any
}

export default class RequestUtil {

  public static get(param: Request) {
    param.url += '?' + this.getWWWFormUrlEncodedBody(param.data);
    return fetch(Constant.URL_HEAD + param.url, {
      method: 'GET',
      headers: param.headers,
      mode: 'cors'
    }).then(resp => {
      return resp.json();
    }).then((resp: ResponseData) => {
      if (resp.code === 1) {
        return resp;
      } else {
        message.error(resp.msg);
        throw new Error(resp.msg);
      }
    });
  }

  public static post(param: Request) {
    if (!param.headers) {
      param.headers = {
        'Content-Type': HeaderType.URL_ENCODED
      };
    }
    if (!param.headers['Content-Type']) {
      param.headers['Content-Type'] = HeaderType.URL_ENCODED;
    }
    let body = this.getBody(param.data, param.headers['Content-Type']);
    return fetch(Constant.URL_HEAD + param.url, {
      method: 'POST',
      headers: param.headers,
      body: body,
      mode: 'cors'
    }).then(resp => {
      return resp.json();
    }).then((resp: ResponseData) => {
      if (resp.code === 1) {
        return resp;
      } else {
        message.error(resp.msg);
        throw new Error(resp.msg);
      }
    });
  }

  private static getWWWFormUrlEncodedBody(data: any): string {
    let body = '';
    for (let key in data) {
      if (data[key]) {
        body += `${key}=${data[key]}&`
      }
    }
    return body;
  }

  private static getJsonBody(data: any): string {
    if (data) {
      return JSON.stringify(data);
    }
    return '';
  }

  private static getBody(data: any, contentType: string): string {
    if (data) {
      if (typeof data === 'string') {
        return data;
      }
      if (contentType === HeaderType.JSON) {
        return this.getJsonBody(data);
      } else {
        return this.getWWWFormUrlEncodedBody(data);
      }
    }
    return '';
  }

}
