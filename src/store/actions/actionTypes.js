const statusTypes = (status) => ({
  START: `${status}`,
  SUCCESS: `${status}_SUCCESS`,
  FAIL: `${status}_FAIL`
});

// auth action types
export const AUTH = statusTypes('AUTH');
export const CLOSE_ALERT_AUTH = 'CLOSE_ALERT_AUTH';
export const LOGOUT = statusTypes('LOGOUT');

// admin CRUD
// CRUD users
export const GET_USERS = statusTypes('GET_USERS');
export const CREATE_USER = statusTypes('CREATE_USER');

// CRUD group
export const GET_GROUPS = statusTypes('GET_GROUPS');