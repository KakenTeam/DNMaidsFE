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

export const logout = () => {
	localStorage.clear();
	return {
		type: actionTypes.LOGOUT.SUCCESS,
		isAuthenticated: false,
	};
};

export const auth = data => {
  return dispatch => {
    dispatch(authStart());

    const requestData = JSON.stringify(data);
		let token = null;
		let path = 'auth/login';
		let message = null;

		axios.post(path, requestData, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(response => {
				console.log(response);
				token = response.data.token.access_token;
				let tokenType = response.data.token.token_type;
				message = response.data.message;
				const expirationDate = new Date(new  Date().getTime() + 3600 * 1000);
				localStorage.setItem('accessToken', token);
				localStorage.setItem('tokenType', tokenType);
				localStorage.setItem('expirationDate', expirationDate);
				dispatch(authSuccess(token, message));
			})
			.catch(err => {
				console.log(err.message);
				dispatch(authFail(err));
			});
  };
};
