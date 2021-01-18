
export default {

  namespace: 'exampleIndex',

  state: {
    name: '张三'
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    /**
     * put: 用于触发 action; 
     * call: 用于调用异步逻辑，支持 promise; 
     * select: 用于从 state 里获取数据
     */
    *fetch({ payload }, { call, put }) {  
      yield put({ type: 'save' });
    },
    *test({ payload }, { call, put, select }) {  
      yield put({ type: 'testChange', payload:payload });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    testChange(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
