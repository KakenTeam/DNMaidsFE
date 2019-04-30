import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  loading: false,
  isAuthenticated: false,
  adminInfo: {},
  token: null,
  error: null,
  message: null,
  authRedirectPath: '/',
  notifications: null,
};

const closeAlertAuth = (state, action) => {
  return updateObject(state, {
    responseMessage: null
  });
};

const authStart = (state, action) => updateObject(state, {
  loading: true,
});

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.accessToken,
    loading: false,
    isAuthenticated: true,
    notifications: action.message,
  });
}

const authFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    isSignup: false,
    notifications: action.error
  });
};

const authLogout = (state, action) => updateObject(state, {
  isAuthenticated: false,
  token: null
});

const getAdminStart = (state, action) => ({
  loading: action.isFetching,
});

const getAdminSuccess = (state, action) => {
  return updateObject(state, {
    loading: action.isFetching,
    adminInfo: action.adminInfo,
  });
};

const getAdminFail = (state, action) => ({
  loading: action.isFetching,
  notifications: action.error,
});

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CLOSE_ALERT_AUTH: return closeAlertAuth(state, action);
    case actionTypes.AUTH.START: return authStart(state, action);
    case actionTypes.AUTH.SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH.FAIL: return authFail(state, action);
    case actionTypes.GET_ADMIN.START: return getAdminStart(state, action);
    case actionTypes.GET_ADMIN.SUCCESS: return getAdminSuccess(state, action);
    case actionTypes.GET_ADMIN.FAIL: return getAdminFail(state, action);
    case actionTypes.LOGOUT.SUCCESS: return authLogout(state, action);
    default: return state;
  }
};

export default auth;