import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  loading: true,
  users: [],
  toggleCreate: false,
  groups: [],
  message: [],
  notifications: [],
  errors: [],
  isDelete: false,
  numSelected: 0,
};

const createUserStart = (state, action) => updateObject(state, {
  loading: action.isFetching,
});

const createUserSuccess = (state, action) => {
  const newUsers = [
    ...state.users,
    {
      ...action.user,
    },
  ];

  const newNotification = [
    ...state.notifications,
    {
      notification: action.message,
    }
  ];

  console.log(typeof newNotification);

  return updateObject(state, {
    loading: action.isFetching,
    users: newUsers,
    notifications: newNotification,
  });
};

const createUserFail = (state, action) => {
  const newErrors = [
    ...state.errors,
    {
      error: action.errors,
    },
  ];

  return updateObject(state, {
    loading: action.isFetching,
    errors: newErrors,
  });
};

const getUsersStart = (state, action) => updateObject(state, {
  loading: true,
});

const getUsersSuccess = (state, action) => {
  return updateObject(state, {
    users: [...action.users.users],
    message: action.message,
  });
};

const getUsersFail = (state, action) => {
  return updateObject(state, {
    message: action.error,
  });
};

const toggleCreate = (state, action) => {
  return updateObject(state, {
    toggleCreate: action.openCreate,
  });
};

const deleteUserStart = (state, action) => updateObject(state, {
  loading: action.isFetching,
  isDelete: action.isDelete,
});

const deleteUserSuccess = (state, action) => {
  const newUsers = state.users.filter(user => user.id !== action.id);

  const newNotification = [
    ...state.notifications,
    {
      notification: action.message,
    }
  ];
  
  return updateObject(state, {
    users: newUsers,
    notifications: newNotification,
    loading: action.isFetching,
    isDelete: action.isDelete,
  });
};

const deleteUserFail = (state, action) => {
  const newNotification = [
    ...state.notifications,
    {
      notification: action.message,
    }
  ];

  return updateObject(state, {
    loading: action.isFetching,
    notifications: newNotification,
    isDelete: action.isDelete,
  });
};

const addSelected = (state, action) => {
  const newNumSelected = state.numSelected + 1;
  return updateObject(state, {
    numSelected: newNumSelected,
  });
};

const removedSelected = (state, action) => {
  const newNumSelected = state.numSelected - 1;
  return updateObject(state, {
    numSelected: newNumSelected,
  });
}

const getGroupsStart = (state, action) => updateObject(state, {
  loading: action.isFetching,
});

const getGroupsSuccess = (state, action) => updateObject(state, {
  loading: action.isFetching,
  groups: [...action.groups],
});

const getGroupsFail = (state, action) => updateObject(state, {
  loading: action.isFetching,
  message: action.error,
});

const admin = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_USER.START: return createUserStart(state, action);
    case actionTypes.CREATE_USER.SUCCESS: return createUserSuccess(state, action);
    case actionTypes.CREATE_USER.FAIL: return createUserFail(state, action);
    case actionTypes.GET_USERS.START: return getUsersStart(state, action);
    case actionTypes.GET_USERS.SUCCESS: return getUsersSuccess(state, action);
    case actionTypes.GET_USERS.FAIL: return getUsersFail(state, action);
    case actionTypes.DELETE_USERS.START: return deleteUserStart(state, action);
    case actionTypes.DELETE_USERS.SUCCESS: return deleteUserSuccess(state, action);
    case actionTypes.TOGGLE_CREATE: return toggleCreate(state, action);
    case actionTypes.ADD_SELECTED: return addSelected(state, action);
    case actionTypes.REMOVE_SELECTED: return removedSelected(state, action);
    case actionTypes.DELETE_USERS.FAIL: return deleteUserFail(state, action);
    case actionTypes.GET_GROUPS.START: return getGroupsStart(state, action);
    case actionTypes.GET_GROUPS.SUCCESS: return getGroupsSuccess(state, action);
    case actionTypes.GET_GROUPS.FAIL: return getGroupsFail(state, action);
    default: return state;
  }
};

export default admin;