const statusTypes = (status) => ({
  START: `${status}`,
  SUCCESS: `${status}_SUCCESS`,
  FAIL: `${status}_FAIL`
});

// auth action types
export const AUTH = statusTypes('AUTH');
export const SET_AUTH_REDIRECT_PATH = 'SET_AUTH_REDIRECT_PATH';

export const LOGOUT = statusTypes('LOGOUT');