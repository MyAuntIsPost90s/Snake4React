//请在这里配置你的系统常量
const processEnv = process.env;
let constant:any = null;
if (processEnv.ENV === 'dev') {
  constant = {
    AUTH_KEY: 'auth_key',
    URL_HEAD: ''
  }
}
if (processEnv.ENV === 'test') {
  constant = {
    AUTH_KEY: 'auth_key',
    URL_HEAD: 'http://39.105.212.215:8080/HifitGateway'
  }
}
export default constant;
