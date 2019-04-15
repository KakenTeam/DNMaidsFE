const statusTypes = (status) => ({
  START: `${status}`,
  SUCCESS: `${status}_SUCCESS`,
  FAIL: `${status}_FAIL`
});

// auth action types
export const AUTH = statusTypes('AUTH');
export const CLOSE_ALERT_AUTH = 'CLOSE_ALERT_AUTH';

export const LOGOUT = statusTypes('LOGOUT');