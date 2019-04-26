import * as actionTypes from './actionTypes';
import axios from '../../shared/api';

const getAccessToken = () => {
  const token = localStorage.getItem('accessToken');
  const tokenType = localStorage.getItem('tokenType');
  return `${tokenType} ${token}`;
};

const createUserStart = () => ({
  type: actionTypes.CREATE_USER.START,
  isFetching: true,
});

const createUserSuccess = (mess, data) => ({
  type: actionTypes.CREATE_USER.SUCCESS,
  isFetching: false,
  message: mess,
  user: data,
});

const createUserFail = (err) => ({
  type: actionTypes.CREATE_USER.FAIL,
  isFetching: false,
  errors: err,
});

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

const deleteUserStart = () => ({
  type: actionTypes.DELETE_USERS.START,
  isDelete: false,
  isFetching: true,
});

const deleteUserSuccess = (id, message) => ({
  type: actionTypes.DELETE_USERS.SUCCESS,
  isDelete: true,
  isFetching: false,
  id: id,
  message: message,
});

const deleteUserFail = err => ({
  type: actionTypes.DELETE_USERS.FAIL,
  isDelete: false,
  isFetching: false,
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

export const addSelected = () => {
  return {
    type: actionTypes.ADD_SELECTED,
  };
};

export const removeSelected = () => {
  return {
    type: actionTypes.REMOVE_SELECTED,
  };
};

export const toggleCreate = (open) => {
  return {
    type: actionTypes.TOGGLE_CREATE,
    openCreate: open,
  };
};

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

export const deleteUser = id => {
  return async dispatch => {
    dispatch(deleteUserStart());
    const path = `/users/${id}`;
    await axios.delete(path, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': getAccessToken(),
      },
    })
      .then(response => {
        console.log(response);
        const message = 'Delete successfull';
        dispatch(deleteUserSuccess(id, message));
      })
      .catch(err => {
        console.log(err);
        dispatch(deleteUserFail(err));
      })
  };
};

export const createUser = data => {
  console.log(data);
  return async dispatch => {
    dispatch(createUserStart());
    const path = '/users';
    axios.post(path, data,{
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': getAccessToken(),
      },
    })
      .then(response => {
        console.log(response);
        const message = response.data.message;
        console.log("message sucess--", message);
        const info = response.data.info;
        dispatch(createUserSuccess(message, info));
      })
      .catch(error => {
        let me = error['errors'];
        console.log(me);
        dispatch(createUserFail(error.message));
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
        dispatch(getUsersFail(err));
      });
  };
};