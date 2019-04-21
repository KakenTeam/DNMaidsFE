import * as actionTypes from './actionTypes';
import axios from '../../shared/api';

const getAccessToken = () => {
  const token = localStorage.getItem('accessToken');
  const tokenType = localStorage.getItem('tokenType');
  return `${tokenType} ${token}`;
};

const getUsersStart = () => ({
  type: actionTypes.GET_USERS.START,
  isFetching: true,
});

const getUsersSuccess = (data, message) => ({
  type: actionTypes.GET_USERS.SUCCESS,
  isFetching: false,
  users: data,
  message: message,
});

const getUsersFail = (err) => ({
  type: actionTypes.GET_USERS.FAIL,
  error: err,
});

const getGroupStart = () => ({
  type: actionTypes.GET_GROUPS.START,
  isFetching: true,
});

const getGroupSuccess = (data) => ({
  type: actionTypes.GET_GROUPS.SUCCESS,
  isFetching: false,
  groups: data,
});

const getGroupFail = (err) => ({
  type: actionTypes.GET_GROUPS.FAIL,
  error: err,
});

export const getGroups = () => {
  return async dispatch => {
    await dispatch(getGroupStart());
    const path = '/groups';
    await axios.get(path, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': getAccessToken(),
      }
    })
      .then(response => {
        console.log(response);
        dispatch(getGroupSuccess(response.data));
      })
      .catch(err => {
        console.log(err.response);
        dispatch(getGroupFail());
      });
  };
};

export const getUsers = () => {
  return async dispatch => {
    await dispatch(getUsersStart());
    const path = '/users';
    await axios.get(path, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': getAccessToken(),
      }
    })
      .then(response => {
        console.log(response.data);
        dispatch(getUsersSuccess(response.data.data, response.message));
      })
      .catch(err => {
        console.log(err);
        dispatch(getUsersFail(err));
      });
  };
};