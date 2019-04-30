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
  variant: 'success',
  message: mess,
  user: data,
});

const createUserFail = (err) => ({
  type: actionTypes.CREATE_USER.FAIL,
  isFetching: false,
  variant: 'error',
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
  variant: 'success',
  id: id,
  message: message,
});

const deleteUserFail = err => ({
  type: actionTypes.DELETE_USERS.FAIL,
  isDelete: false,
  isFetching: false,
  variant: 'error',
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

export const toggleEdit = open => ({
  type: actionTypes.TOGGLE_EDIT,
  openEdit: open,
});

const showUserStart = () => ({
  type: actionTypes.SHOW_USER.START,
  isFetching: true,
  isShow: false,
});

const showUserSuccess = (data, mess) => ({
  type: actionTypes.SHOW_USER.SUCCESS,
  isFetching: false,
  isShow: true,
  user: data,
  variant: 'success',
  message: mess,
});

const showUserFail = (err) => ({
  type: actionTypes.SHOW_USER.FAIL,
  isFetching: false,
  isShow: false,
  variant: 'error',
  error: err,
});

const editUserStart = () => ({
  type: actionTypes.EDIT_USER.START,
  isFetching: true,
});

const editUserSuccess = (mess) => ({
  type: actionTypes.EDIT_USER.SUCCESS,
  isFetching: false,
  variant: 'success',
  message: mess,
});

const editUserFail = (err) => ({
  type: actionTypes.EDIT_USER.FAIL,
  isFetching: false,
  variant: 'error',
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
        dispatch(getGroupSuccess(response.data));
      })
      .catch(err => {
        console.log(err.response);
        dispatch(getGroupFail(err.message));
      });
  };
};

export const showUser = (id) => {
  console.log('id show ', id);
  return async dispatch => {
    await dispatch(showUserStart());
    const path = `/users/${id}`;
    await axios.get(path, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': getAccessToken(),
      }
    })
    .then(response => {
      dispatch(showUserSuccess(response.data.info, response.data.message));
    })
    .catch(err => {
      console.log(err);
      dispatch(showUserFail(err.message));
      });
    };
  }
  
  export const editUser = (id, data) => {
    console.log('id, data', id, data);
    return async dispatch => {
      dispatch(editUserStart());
      const path = `/users/${id}`;
      await axios.patch(path, data, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': getAccessToken(),
        },
      })
        .then(response => {
          console.log('edit sussess',response);
          dispatch(editUserSuccess(response.data.message));
        })
        .catch(err => {
          console.log(err.response);
          dispatch(editUserFail(err.response.data.message));
        })
  };
}

export const deleteUser = id => {
  return async dispatch => {
    await dispatch(deleteUserStart());
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
        console.log(err.message);
        dispatch(deleteUserFail(err.message));
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
        console.log(err);
        dispatch(getUsersFail(err.message));
      });
  };
};
export const closeAlert = () => ({
	type: actionTypes.CLOSE_ALERT,
});