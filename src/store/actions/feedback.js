
import * as actionTypes from './actionTypes';
import axios from '../../shared/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar'

const getAccessToken = () => {
  const token = localStorage.getItem('accessToken');
  const tokenType = localStorage.getItem('tokenType');
  return `${tokenType} ${token}`;
};

const getFeedbacksStart = () => ({
  type: actionTypes.GET_FEEDBACKS.START,
  isFetching: true,
});

const getFeedbacksSuccess = (data) => ({
  type: actionTypes.GET_FEEDBACKS.SUCCESS,
  isFetching: false,
  feedbacks: data,
});

const getFeedbacksFail = err => ({
  type: actionTypes.GET_FEEDBACKS.FAIL,
  isFetching: false,
  error: err,
});

export const getFeedbacks = () => {
  return dispatch => {
    dispatch(getFeedbacksStart());
    dispatch(showLoading());
    const path = '/feedbacks';
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
        dispatch(getFeedbacksSuccess(response.data.data));
      })
      .catch(err => {
        dispatch(getFeedbacksFail(err));
      });
  };;
};