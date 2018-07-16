
import { message } from 'antd';
import { RetrievePaging } from '../services/api';

export default {
  namespace: 'historyCommand',

  state: {
    data: {
      list: [{
        key: '1',
        status: '已送达',
        commandId: '4b5c9b9b061a4524934a39c78dbc80d2',
        SN: '83050064',
        createTime: '20180710T130635Z',
        arriveTime:'20180710T130635Z',
        executeTime:'20180710T130635Z',
        command:'TCLD110S{(Background):{}}',
      }],
      total: 0,
    },
  },

  effects: {
    *RetrievePaging({ payload }, { call, put }) {
      const response = yield call(RetrievePaging, payload);
      yield put({
        type: 'responseRetrievePaging',
        response,
      });
    },
  },

  reducers: {
    responseRetrievePaging(state, { response }) {
      console.log('historyCommand RetrievePaging response', response);
      switch (response.code) {
        case 'success':
          message.success('获取成功');
          return { ...state, data: response};
        default:
          message.error(response.code ? `获取失败 ${response.code}` : '获取失败 failed_code_false');
          break;
      }
      return { ...state };
    },
  },
};
