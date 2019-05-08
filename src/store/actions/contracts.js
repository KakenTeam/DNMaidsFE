import * as actionTypes from './actionTypes';
import axios from '../../shared/api';

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
      })
      .catch(err => {
        dispatch(showContractFail(err));
      })
  };
};

export const getContracts = () => {
  return dispatch => {
    dispatch(getContractsStart());
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
        dispatch(getContractsSuccess(response.data.data));
      })
      .catch(err => {
        dispatch(getContractsFail(err));
      });
  };;
};