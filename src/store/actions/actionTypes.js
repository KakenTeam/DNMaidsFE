const statusTypes = (status) => ({
  START: `${status}`,
  SUCCESS: `${status}_SUCCESS`,
  FAIL: `${status}_FAIL`
});

// auth action types
export const AUTH = statusTypes('AUTH');
export const CLOSE_ALERT_AUTH = 'CLOSE_ALERT_AUTH';
export const LOGOUT = statusTypes('LOGOUT');
export const GET_ADMIN = statusTypes('GET_ADMIN');

// update profile, password admin
export const UPDATE_PROFILE_ADMIN = statusTypes('UPDATE_PROFILE_ADMIN');
export const UPDATE_PASSWORD_ADMIN = statusTypes('UPDATE_PASSWORD_ADMIN');

export const CLOSE_ALERT = 'CLOSE_ALERT';

// admin CRUD
// CRUD users
export const CREATE_USER = statusTypes('CREATE_USER');
export const TOGGLE_CREATE = 'TOGGLE_CREATE';
export const GET_USERS = statusTypes('GET_USERS');
export const DELETE_USERS = statusTypes('DELETE_USERS');
export const SHOW_USER = statusTypes('SHOW_USER');
export const EDIT_USER = statusTypes('EDIT_USER');
export const TOGGLE_EDIT = 'TOGGLE_EDIT';

// CRUD admin contracts
export const GET_CONTRACTS = statusTypes('GET_CONTRACTS');
export const SHOW_CONTRACT = statusTypes('SHOW_CONTRACT');
export const UPDATE_CONTRACT_STATUS = statusTypes('UPDATE_CONTRACT_STATUS');

// get skills
export const GET_SKILLS = statusTypes('GET_SKILLS');

// selected user 
export const ADD_SELECTED = 'ADD_SELECTED';
export const REMOVE_SELECTED = 'REMOVE_SELECTED';

// CRUD group
export const GET_GROUPS = statusTypes('GET_GROUPS');

// snackbar
export const ENQUEUE_SNACKBAR = 'ENQUEUE_SNACKBAR';
export const REMOVE_SNACKBAR = 'REMOVE_SNACKBAR';

// CRUD feedbacks 
export const GET_FEEDBACKS = statusTypes('GET_FEEDBACKS');
