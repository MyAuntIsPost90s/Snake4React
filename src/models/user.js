import RequestUtil from '../utils/RequestUtil';
import md5 from 'md5';

export default {
  namespace: 'user',

  state: {},
  effects: {
    * login({payload}, {call}) {
      try {
        const login = {
          ...payload,
          password: md5(payload.password).toUpperCase()
        }
        const response = yield call(async () => {
          return RequestUtil.post({
            url: '/sys/user/user/login',
            data: login
          })
        }, payload);
        return response;
      } catch (e) {
        console.log(e);
      }
    }
  },
  reducers: {
    setList(state, {payload}) {
      console.log(payload)
      return {
        ...state,
        users: payload
      }
    }
  }
}
