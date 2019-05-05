import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  loading: false,
  contracts: [],
  detailContract: {},
  notifications: [],
};

const getContractsStart = (state, action) => updateObject(state, {
  loading: true,
});

const getContractsSuccess = (state, action) => updateObject(state, {
  contracts: [...action.contracts],
  loading: false,
});

const getContractsFail = (state, action) => updateObject(state, {
  
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
    ...action.contractUpdate.status,
    ...action.contractUpdate.updated_at,
  };

  return updateObject(state, {
    loading: false,
    notifications: action.message,
    detailContract: newUpdate,
  });
};

const updateContactStatusFail = (state, action) => updateObject(state, {
  loading: false,
  notifications: action.error,
});

const contracts = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CONTRACTS.START: return getContractsStart(state, action);
    case actionTypes.GET_CONTRACTS.SUCCESS: return getContractsSuccess(state, action);
    case actionTypes.GET_CONTRACTS.FAIL: return getContractsFail(state, action);
    case actionTypes.SHOW_CONTRACT.START: return showContractStart(state, action);
    case actionTypes.SHOW_CONTRACT.SUCCESS: return showContractSuccess(state, action);
    case actionTypes.SHOW_CONTRACT.FAIL: return showContractFail(state, action);
    case actionTypes.UPDATE_CONTRACT_STATUS.START: return updateContactStatusStart();
    case actionTypes.UPDATE_CONTRACT_STATUS.SUCCESS: return updateContactStatusSuccess();
    case actionTypes.UPDATE_CONTRACT_STATUS.FAIL: return updateContactStatusFail();
    default: return state;
  }
};

export default contracts;