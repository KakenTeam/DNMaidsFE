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
  variant: '',
};

const closeAlertAuth = (state, action) => {
  return updateObject(state, {
    notifications: null
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

const updateProfileAdminStart = (state, action) => updateObject(state, {
  loading: action.isFetching,
});

const updateProfileAdminSuccess = (state, action) => {
  const newProfile = {
    ...state.adminInfo,
    ...action.newProfile,
  };

  return updateObject(state, {
    adminInfo: newProfile,
    loading: action.isFetching,
    notifications: action.message,
    variant: 'success',
  });
};

const updateProfileAdminFail = (state, action) => {
  return updateObject(state, {
    loading: action.isFetching,
    notifications: action.error,
    variant: 'error',
  });
};

const updatePasswordAdminStart = (state, action) => updateObject(state, {
  loading: action.isFetching,
});

const updatePasswordAdminSuccess = (state, action) => {
  return updateObject(state, {
    notifications: action.message,
    variant: action.variant,
  });
};

const updatePasswordAdminFail = (state, action) => {
  return updateObject(state, {
    notifications: action.error,
    variant: action.variant,
  });
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CLOSE_ALERT_AUTH: return closeAlertAuth(state, action);
    case actionTypes.AUTH.START: return authStart(state, action);
    case actionTypes.AUTH.SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH.FAIL: return authFail(state, action);
    case actionTypes.GET_ADMIN.START: return getAdminStart(state, action);
    case actionTypes.GET_ADMIN.SUCCESS: return getAdminSuccess(state, action);
    case actionTypes.UPDATE_PROFILE_ADMIN.START: return updateProfileAdminStart(state, action);
    case actionTypes.UPDATE_PROFILE_ADMIN.SUCCESS: return updateProfileAdminSuccess(state, action);
    case actionTypes.UPDATE_PROFILE_ADMIN.FAIL: return updateProfileAdminFail(state, action);
    case actionTypes.UPDATE_PASSWORD_ADMIN.START: return updatePasswordAdminStart(state, action);
    case actionTypes.UPDATE_PASSWORD_ADMIN.SUCCESS: return updatePasswordAdminSuccess(state, action);
    case actionTypes.UPDATE_PASSWORD_ADMIN.FAIL: return updatePasswordAdminFail(state, action);
    case actionTypes.GET_ADMIN.FAIL: return getAdminFail(state, action);
    case actionTypes.LOGOUT.SUCCESS: return authLogout(state, action);
    default: return state;
  }
};

export default auth;