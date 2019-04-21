import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  loading: true,
  users: [],
  groups: [],
  message: null,
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
    case actionTypes.GET_USERS.START: return getUsersStart(state, action);
    case actionTypes.GET_USERS.SUCCESS: return getUsersSuccess(state, action);
    case actionTypes.GET_USERS.FAIL: return getUsersFail(state, action);
    case actionTypes.GET_GROUPS.START: return getGroupsStart(state, action);
    case actionTypes.GET_GROUPS.SUCCESS: return getGroupsSuccess(state, action);
    case actionTypes.GET_GROUPS.FAIL: return getGroupsFail(state, action);
    default: return state;
  }
};

export default admin;