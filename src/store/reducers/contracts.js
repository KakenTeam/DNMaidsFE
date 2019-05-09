import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  loading: false,
  contracts: [],
  helpersContract: [],
  detailContract: {},
  notifications: '',
  variant: '',
};

const closeAlert = (state, action) => updateObject(state, {
  notifications: null,
});

const getContractsStart = (state, action) => updateObject(state, {
  loading: true,
});

const getContractsSuccess = (state, action) => updateObject(state, {
  contracts: [...action.contracts],
  loading: false,
});

const getContractsFail = (state, action) => updateObject(state, {
  loading: false,
});

const getHelpersContractStart = (state, action) => updateObject(state, {
  loading: true,
});

const getHelpersContractSuccess = (state, action) => updateObject(state, {
  helpersContract: [...action.helpers],
  loading: false,
});

const getHelpersContractFail = (state, action) => updateObject(state, {
  loading: false,
});

const showContractStart = (state, action) => updateObject(state, {
  loading: true,
});

const showContractSuccess = (state, action) => updateObject(state, {
  detailContract: action.detailContract,
  loading: false,
});

const showContractFail = (state, action) => updateObject(state, {
  loading: false,
});

const updateContactStatusStart = (state, action) => updateObject(state, {
  loading: true,
});

const updateContactStatusSuccess = (state, action) => {
  const newUpdate = {
    ...state.detailContract,
    ...action.status,
  };

  return updateObject(state, {
    loading: false,
    notifications: action.message,
    detailContract: newUpdate,
    variant: 'success',
  });
};

const updateContactStatusFail = (state, action) => updateObject(state, {
  loading: false,
  notifications: action.error,
  variant: 'error',
});

const updateHelperStart = (state, action) => updateObject(state, {
  loading: true,
});

const updateHelperSuccess = (state, action) => {
  let newHelperUpdate = state.helpersContract.filter(helper => {
    return helper.id === action.idHelper;
  });

  let newDetailContract = {
    ...state.detailContract,
    helper: {
      ...newHelperUpdate[0],
    },
    status: action.statusUpdate,
    skills: [...newHelperUpdate[0].skills]
  };

  const newHelpersContract = state.helpersContract.filter(helper => {
    return helper.id !== action.idHelper;
  });

  return updateObject(state, {
    detailContract: newDetailContract,
    helpersContract: newHelpersContract,
    notifications: action.message,
    variant: 'success',
  });
};

const updateHelperFail = (state, action) => {
  return updateObject(state, {
    notifications: action.error,
    variant: 'error',
  });
};

const contracts = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CLOSE_ALERT: return closeAlert(state, action);
    case actionTypes.GET_CONTRACTS.START: return getContractsStart(state, action);
    case actionTypes.GET_CONTRACTS.SUCCESS: return getContractsSuccess(state, action);
    case actionTypes.GET_CONTRACTS.FAIL: return getContractsFail(state, action);
    case actionTypes.GET_HELPERS_CONTRACT.START: return getHelpersContractStart(state, action);
    case actionTypes.GET_HELPERS_CONTRACT.SUCCESS: return getHelpersContractSuccess(state, action);
    case actionTypes.GET_HELPERS_CONTRACT.FAIL: return getHelpersContractFail(state, action);
    case actionTypes.UPDATE_HELPER.START: return updateHelperStart(state, action);
    case actionTypes.UPDATE_HELPER.SUCCESS: return updateHelperSuccess(state, action);
    case actionTypes.UPDATE_HELPER.FAIL: return updateHelperFail(state, action);
    case actionTypes.SHOW_CONTRACT.START: return showContractStart(state, action);
    case actionTypes.SHOW_CONTRACT.SUCCESS: return showContractSuccess(state, action);
    case actionTypes.SHOW_CONTRACT.FAIL: return showContractFail(state, action);
    case actionTypes.UPDATE_CONTRACT_STATUS.START: return updateContactStatusStart(state, action);
    case actionTypes.UPDATE_CONTRACT_STATUS.SUCCESS: return updateContactStatusSuccess(state, action);
    case actionTypes.UPDATE_CONTRACT_STATUS.FAIL: return updateContactStatusFail(state, action);
    default: return state;
  }
};

export default contracts;