export default class {
  public static check(param: any, paramValid: any): boolean {
    if (param && paramValid) {
      for (let field in paramValid) {
        if (field === 'e') {
          continue;
        }
        let val = param[field];
        let validStr = paramValid[field];
        let valid = eval('({' + validStr + '})');
        if (!valid) {
          continue;
        }
        if (!valid.name) {
          valid.name = field;
        }
        if (valid.notEmpty === true) { //判断非空
          if (!val) {
            paramValid.e = valid.name + '不能为空';
            return false;
          }
        }
        if (valid.length) { //判断长度
          if (!val) {
            paramValid.e = valid.name + '长度应在' + valid.length[0] + '到' + valid.length[1] + '之间';
            return false;
          }
          if (val.length < valid.length[0] || val.length > valid.length[1]) {
            paramValid.e = valid.name + '长度应在' + valid.length[0] + '到' + valid.length[1] + '之间';
            return false;
          }
        }
      }
      return true;
    }
    return true;
  }
}
