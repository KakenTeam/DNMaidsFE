
import * as actionTypes from './actionTypes';
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import axios from '../../shared/api';

const getAccessToken = () => {
  const token = localStorage.getItem('accessToken');
  const tokenType = localStorage.getItem('tokenType');
  return `${tokenType} ${token}`;
};


const getStatisticStart = () => ({
  type: actionTypes.GET_STATISTIC.START,
  isFetching: true,
});

const getStatisticSuccess = (data) => ({
  type: actionTypes.GET_STATISTIC.SUCCESS,
  isFetching: false,
  statistic: data,
});

const getStatisticFail = err => ({
  type: actionTypes.GET_STATISTIC.FAIL,
  isFetching: false,
  error: err,
});


export const getStatistic = (start_date, end_date, filter) => {
  return dispatch => {
    dispatch(getStatisticStart())
    dispatch(showLoading());
    const path = `statistic/summary?start_date=${start_date}&end_date=${end_date}&filter=${filter}`
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
        dispatch(getStatisticSuccess(response.data.data));
      })
      .catch(err => {
        dispatch(getStatisticFail(err));
      });
  }
}