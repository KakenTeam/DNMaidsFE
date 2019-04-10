import * as actionTypes from './actionTypes';
import axios from '../../shared/api';

const authStart = () => ({
  type: actionTypes.AUTH.START,
  isFetching: true,
  isAuthenticated: false
});

const authSuccess = (token, message)  => ({
  type: actionTypes.AUTH.SUCCESS,
  isFetching: false,
  isAuthenticated: true,
  accessToken: token,
  message: message
});

const authFail = (err) => ({
  type: actionTypes.AUTH.FAIL,
  isFetching: false,
  isAuthenticated: false,
  error: err
});

export const auth = (data, isSignup) => {
	console.log(data);
  return dispatch => {
    dispatch(authStart());

    const requestData = JSON.stringify(data);
		let token = null;
		let path = 'auth/login';
		let message = 'Login success';

		if (isSignup === true) {
			path = 'auth/signup'
			message = 'Sign up success';
		}

		axios.post(path, requestData, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(response => {
				if (isSignup) {
					dispatch(authSuccess(token, message));
					return;
				}
				console.log(response);
				// token = response.headers.authorization;
				const expirationDate = new Date(new  Date().getTime() + 3600 * 1000);
				localStorage.setItem('accessToken', token);
				localStorage.setItem('expirationDate', expirationDate);
				dispatch(authSuccess(token, message));
			})
			.catch(err => {
				dispatch(authFail(err));
			});
  };
};