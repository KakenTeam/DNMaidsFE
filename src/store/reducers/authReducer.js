import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  loading: false,
  isAuthenticated: false,
  message: null
};

const authStart = (state, action) => updateObject(state, {
  loading: true,
  isAuthenticated: false
});

const authSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    isAuthenticated: true,
    message: 'login successs'
  });
};

const authFail = (state, action) => updateObject(state, {
  loading: false,
  isAuthenticated: false,
  message: 'login failed'
});

const auth = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.AUTH.START: return authStart(state, action);
    case actionTypes.AUTH.SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH.FAIL: return authFail(state, action);
    default: return state;
  }
};

export default auth;