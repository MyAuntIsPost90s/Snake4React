interface RequestLink {
  history: any
  path: string
  query?: any
}

export default class {

  private static getQuery(data?: any) {
    let query = '';
    if (data) {
      for (let field in data) {
        query += `${field}=${data[field]}&`;
      }
    }
    return query;
  }

  public static link(param: RequestLink) {
    if (param)
      if (param.history) {
        let query = this.getQuery(param.query);
        if (param.path.indexOf('?') > -1) {
          param.path = param.path + '&' + query;
        } else {
          param.path = param.path + '?' + query;
        }
        param.history.push(param.path);
      } else {
        console.log('history不存在');
      }
  }
}
