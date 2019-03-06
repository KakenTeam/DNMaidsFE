import * as actionTypes from './actionTypes';
import axios from 'axios';

const authStart = () => ({
  type: actionTypes.AUTH.START,
  isFetching: true,
  isAuthenticated: false
});

const authSuccess = (token) => ({
  type: actionTypes.AUTH.SUCCESS,
  isFetching: false,
  isAuthenticated: true,
  accessToken: token
});

const authFail = (err) => ({
  type: actionTypes.AUTH.FAIL,
  isAuthenticated: false,
  error: err
});

export const auth = (data) => {
  return dispatch => {
    dispatch(authStart());

    let path = '/login';

    axios.post(path, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        console.log('success');
        dispatch(authSuccess('login success'));
      })
      .catch(err => {
        dispatch(authFail('login failed'));
      });
  }
};