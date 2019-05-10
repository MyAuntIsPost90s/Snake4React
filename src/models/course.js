import RequestUtil from '../utils/RequestUtil';

export default {
  namespace: 'course',

  state: {
    pageList: {
      total: 0,
      rows: []
    }
  },
  effects: {
    * list({payload}, {call, put}) {
      try {
        const response = yield call(async () => {
          return RequestUtil.post({
            url: '/app/course/course/list',
            data: payload
          })
        }, payload);
        yield put({
          type: 'setList',
          payload: response.data
        })
        return response;
      } catch (e) {
        console.log(e);
      }
    }
  },
  reducers: {
    setList(state, {payload}) {
      return {
        ...state,
        pageList: payload
      }
    }
  }
}
