import Constant from '../../config/constant';

//权限工具类
export default class AuthUtil {

  public static setAuth(auth: string) {
    if (auth) {
      window.localStorage.setItem(Constant.AUTH_KEY, auth);
    }
  }

  public static getAuth(): string | null {
    return window.localStorage.getItem(Constant.AUTH_KEY);
  }
}
