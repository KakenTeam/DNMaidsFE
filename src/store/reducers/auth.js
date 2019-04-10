import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';


const initialState = {
  loading: false,
  isAuthenticated: false,
  isSignup: false,
  token: null,
  error: null,
  message: null,
  authRedirectPath: '/',
  responseMessage: null
};

const closeAlertAuth = (state, action) => {
  return updateObject(state, {
    responseMessage: null
  });
};

const authRequest = (state, action) => updateObject(state, {
  loading: true,
});

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.access_token,
    loading: false,
    isAuthenticated: true,
    isSignup: true,
    message: action.message,
    responseMessage: 'Sign up success!'
  });
}

const authFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    isSignup: false,
    responseMessage: action.error
  });
};

const authLogout = (state, action) => updateObject(state, {
  isAuthenticated: false,
  token: null
});

const setAuthRedirectPath = (state, action) => updateObject(state, {
  authRedirectPath: action.path
});

const auth = (state = initialState, action) => {
  switch (action.type) {
    // case actionTypes.CLOSE_ALERT_AUTH: return closeAlertAuth(state, action);
    case actionTypes.AUTH.START: return authRequest(state, action);
    case actionTypes.AUTH.SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH.FAIL: return authFailed(state, action);
    // case actionTypes.LOGOUT.SUCCESS: return authLogout(state, action);
    // case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
    default: return state;
  }
};

export default auth;