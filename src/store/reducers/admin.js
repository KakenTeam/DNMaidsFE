import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  loading: true,
  users: [],
  user: {},
  toggleCreate: false,
  toggleEdit: false,
  groups: [],
  skills: [],
  message: [],
  notifications: [],
  errors: [],
  isDelete: false,
  isEdit: false,
  isShow: false,
  numSelected: 0,
};

const closeAlert = (state, action) => {
  const newNoti = state.notifications.splice(1);
  return updateObject(state, {
    notifications: newNoti,
  });
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
      variant: 'success',
    }
  ];

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
      variant: 'error',
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
    users: [...action.users],
    // message: action.message,
  });
};

const getUsersFail = (state, action) => {
  return updateObject(state, {
    // message: action.error,
  });
};

const toggleCreate = (state, action) => {
  return updateObject(state, {
    toggleCreate: action.openCreate,
  });
};

const toggleEdit = (state, action) => updateObject(state, {
  toggleEdit: action.openEdit,
});

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
      variant: 'success',
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
      variant: 'error',
    }
  ];

  return updateObject(state, {
    loading: action.isFetching,
    notifications: newNotification,
    isDelete: action.isDelete,
  });
};

const editUserStart = (state, action) => updateObject(state, {
  loading: action.isFetching,
  isEdit: false,
});

const editUserSuccess = (state, action) => {
  const newNotification = [
    ...state.notifications,
    {
      notification: action.message,
      variant: 'success',
    },
  ];

  const newUsers = state.users.map(user => {
    if (user.id === action.id) {
      return {
        ...user,
        ...action.data,
      };
    }
    return user;
  });

  return updateObject(state, {
    loading: action.isFetching,
    notifications: newNotification,
    isEdit: true,
    users: newUsers,
  });
};

const editUserFail = (state, action) => {
  const newNotification = [
    ...state.notifications,
    {
      notification: action.error,
      variant: 'error',
    },
  ];

  return updateObject(state, {
    loading: action.isFetching,
    notifications: newNotification,
    isEdit: false,
  });
};

const showUserStart = (state, action) => updateObject(state, {
  loading: true,
  isShow: action.isShow,
});

const showUserSuccess = (state, action) => {
  const newNotification = [
    ...state.notifications,
    {
      notification: action.message,
      variant: 'success',
    }
  ];

  return updateObject(state, {
    loading: action.isFetching,
    isShow: action.isShow,
    user: action.user,
    notifications: newNotification,
  });
};

const showUserFail = (state, action) => {
  const newNotification = [
    ...state.notifications,
    {
      notification: action.error,
      variant: 'error',
    }
  ];

  return updateObject(state, {
    loading: action.isFetching,
    isShow: action.isShow,
    notifications: newNotification,
  });
};

const addSelected = (state, action) => {
  const newNumSelected = state.numSelected + 1;
  return updateObject(state, {
    numSelected: newNumSelected,
  });
};

const removedSelected = (state, action) => {
  let newNumSelected = state.numSelected;
  if (state.numSelected > 0) {
    newNumSelected = state.numSelected - 1;
  }
  return updateObject(state, {
    numSelected: newNumSelected,
  });
}

const getGroupsStart = (state, action) => updateObject(state, {
  loading: action.isFetching,
});

const getGroupsSuccess = (state, action) => updateObject(state, {
  loading: action.isFetching,
  groups: action.groups,
});

const getGroupsFail = (state, action) => updateObject(state, {
  loading: action.isFetching,
  message: action.error,
});

const getSkillSuccess = (state, action) => updateObject(state, {
  skills: [...action.skills],
});

const admin = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CLOSE_ALERT: return closeAlert(state, action);
    case actionTypes.CREATE_USER.START: return createUserStart(state, action);
    case actionTypes.CREATE_USER.SUCCESS: return createUserSuccess(state, action);
    case actionTypes.CREATE_USER.FAIL: return createUserFail(state, action);
    case actionTypes.SHOW_USER.START: return showUserStart(state, action);
    case actionTypes.SHOW_USER.SUCCESS: return showUserSuccess(state, action);
    case actionTypes.SHOW_USER.FAIL: return showUserFail(state, action);
    case actionTypes.GET_USERS.START: return getUsersStart(state, action);
    case actionTypes.GET_USERS.SUCCESS: return getUsersSuccess(state, action);
    case actionTypes.GET_USERS.FAIL: return getUsersFail(state, action);
    case actionTypes.DELETE_USERS.START: return deleteUserStart(state, action);
    case actionTypes.DELETE_USERS.SUCCESS: return deleteUserSuccess(state, action);
    case actionTypes.EDIT_USER.START: return editUserStart(state, action);
    case actionTypes.EDIT_USER.SUCCESS: return editUserSuccess(state, action);
    case actionTypes.EDIT_USER.FAIL: return editUserFail(state, action);
    case actionTypes.TOGGLE_CREATE: return toggleCreate(state, action);
    case actionTypes.TOGGLE_EDIT: return toggleEdit(state, action);
    case actionTypes.ADD_SELECTED: return addSelected(state, action);
    case actionTypes.REMOVE_SELECTED: return removedSelected(state, action);
    case actionTypes.DELETE_USERS.FAIL: return deleteUserFail(state, action);
    case actionTypes.GET_GROUPS.START: return getGroupsStart(state, action);
    case actionTypes.GET_GROUPS.SUCCESS: return getGroupsSuccess(state, action);
    case actionTypes.GET_GROUPS.FAIL: return getGroupsFail(state, action);
    case actionTypes.GET_SKILLS.SUCCESS: return getSkillSuccess(state, action);
    default: return state;
  }
};

export default admin;