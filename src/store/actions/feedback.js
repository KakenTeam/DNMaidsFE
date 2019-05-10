
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


const updateFeedbackStatusStart = () => ({
  type: actionTypes.UPDATE_FEEDBACK_STATUS.START,
  isFetching: true,
});

const updateFeedbackStatusSuccess = (status, mess) => ({
  type: actionTypes.UPDATE_FEEDBACK_STATUS.SUCCESS,
  isFetching: false,
  message: mess,
  status: status,
});

const updateFeedbackStatusFail = err => ({
  type: actionTypes.UPDATE_FEEDBACK_STATUS.FAIL,
  isFetching: false,
  error: err,
});

const showFeedbackStart = () => ({
  type: actionTypes.SHOW_FEEDBACK.START
})

const showFeedbackSuccess = (data) => ({
  type: actionTypes.SHOW_FEEDBACK.SUCCESS,
  detailFeedback: data,
})

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

export const updateFeedbackStatus = (id, status) => {
  return dispatch => {
    dispatch(updateFeedbackStatusStart());
    dispatch(showLoading());
    const path = `/feedbacks/${id}`;
    axios.patch(path, status, {
      headers: {
        'Authorization': getAccessToken(),
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then(response => {
        dispatch(hideLoading());
        dispatch(updateFeedbackStatusSuccess(status, response.data.message));
      })
      .catch(err => {
        dispatch(updateFeedbackStatusFail(err.message));
      });
  };
};

export const showFeedback = (feedback) => {
  return dispatch => {
    dispatch(showFeedbackSuccess(feedback))
  }
}