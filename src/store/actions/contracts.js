import * as actionTypes from './actionTypes';
import axios from '../../shared/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar'

const getAccessToken = () => {
  const token = localStorage.getItem('accessToken');
  const tokenType = localStorage.getItem('tokenType');
  return `${tokenType} ${token}`;
};

const getContractsStart = () => ({
  type: actionTypes.GET_CONTRACTS.START,
  isFetching: true,
});

const getContractsSuccess = (data) => ({
  type: actionTypes.GET_CONTRACTS.SUCCESS,
  isFetching: false,
  contracts: data,
});

const getContractsFail = err => ({
  type: actionTypes.GET_CONTRACTS.FAIL,
  isFetching: false,
  error: err,
});

const showContractStart = () => ({
  type: actionTypes.SHOW_CONTRACT.START,
  isFetching: true,
});

const showContractSuccess = data => ({
  type: actionTypes.SHOW_CONTRACT.SUCCESS,
  isFetching: false,
  detailContract: data,
});

const showContractFail = err => ({
  type: actionTypes.SHOW_CONTRACT.FAIL,
  isFetching: false,
  error: err,
});

const updateContractStatusStart = () => ({
  type: actionTypes.UPDATE_CONTRACT_STATUS.START,
  isFetching: true,
});

const updateContractStatusSuccess = (status, mess) => ({
  type: actionTypes.UPDATE_CONTRACT_STATUS.SUCCESS,
  isFetching: false,
  message: mess,
  status: status,
});

const updateContractStatusFail = err => ({
  type: actionTypes.UPDATE_CONTRACT_STATUS.FAIL,
  isFetching: false,
  error: err,
});

const getHelpersContractStart = () => ({
  type: actionTypes.GET_HELPERS_CONTRACT.START,
  isFetching: true,
});


const getHelpersContractSuccess = (data) => ({
  type: actionTypes.GET_HELPERS_CONTRACT.SUCCESS,
  isFetching: false,
  helpers: data,
});

const getHelpersContractFail = err => ({
  type: actionTypes.GET_HELPERS_CONTRACT.FAIL,
  isFetching: false,
  error: err,
});

const updateHelperStart = () => ({
  type: actionTypes.UPDATE_HELPER.START,
});

const updateHelperSuccess = (mess, idHelper) => ({
  type: actionTypes.UPDATE_HELPER.SUCCESS,
  message: mess,
  idHelper: idHelper,
  statusUpdate: 'verified',
});

const updateHelperFail = err => ({
  type: actionTypes.UPDATE_HELPER.FAIL,
  error: err,
});

export const updateHelper = (idContract, idHelper) => {
  let data = {
    "helper_id": idHelper,
    "status" : "verified"
  };

  return dispatch => {
    dispatch(updateHelperStart());
    const path = `/contracts/${idContract}/assign`;
    axios.patch(path, data, {
      headers: {
        'Authorization': getAccessToken(),
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then(response => {
        dispatch(updateHelperSuccess(response.data.message, idHelper));
      })
      .catch(err => {
        dispatch(updateHelperFail(err));
      });
  };
};

export const getHelpersContract = id => {
  return dispatch => {
    dispatch(getHelpersContractStart());
    const path = `/find_helpers/${id}`;
    axios.get(path, {
      headers: {
        'Authorization': getAccessToken(),
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then(response => {
        dispatch(getHelpersContractSuccess(response.data.data));
      })
      .catch(err => {
        dispatch(getHelpersContractFail(err));
      })
  };
};

export const updateContractStatus = (id, status) => {
  return dispatch => {
    dispatch(updateContractStatusStart());
    const path = `/contracts/${id}/status`;
    axios.patch(path, status, {
      headers: {
        'Authorization': getAccessToken(),
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then(response => {
        dispatch(updateContractStatusSuccess(status, response.data.message));
      })
      .catch(err => {
        dispatch(updateContractStatusFail(err.message));
      });
  };
};

export const showContract = (id) => {
  return dispatch => {
    dispatch(showContractStart());
    dispatch(showLoading());
    const path = `/contracts/${id}`;
    axios.get(path, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': getAccessToken(),
      },
    })
      .then(response => {
        dispatch(showContractSuccess(response.data.data));
        dispatch(hideLoading());
      })
      .catch(err => {
        dispatch(showContractFail(err));
      })
  };
};

export const getContracts = () => {
  return dispatch => {
    dispatch(getContractsStart());
    dispatch(showLoading());
    const path = '/contracts';
    axios.get(path, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': getAccessToken(),
      },
    })
      .then(response => {
        dispatch(hideLoading());
        dispatch(getContractsSuccess(response.data.data));
      })
      .catch(err => {
        dispatch(getContractsFail(err));
      });
  };;
};

export const closeAlertUpdateHelper = () => ({
  type: actionTypes.CLOSE_ALERT,
});