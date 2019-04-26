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
export const CREATE_USER = statusTypes('CREATE_USER');
export const GET_USERS = statusTypes('GET_USERS');
export const DELETE_USERS = statusTypes('DELETE_USERS');
export const TOGGLE_CREATE = 'TOGGLE_CREATE';

// selected user 
export const ADD_SELECTED = 'ADD_SELECTED';
export const REMOVE_SELECTED = 'REMOVE_SELECTED';

// CRUD group
export const GET_GROUPS = statusTypes('GET_GROUPS');

// snackbar
export const ENQUEUE_SNACKBAR = 'ENQUEUE_SNACKBAR';
export const REMOVE_SNACKBAR = 'REMOVE_SNACKBAR';
