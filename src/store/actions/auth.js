import * as actionTypes from './actionTypes';
import axios from '../../shared/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar'


const getAccessToken = () => {
  const token = localStorage.getItem('accessToken');
  const tokenType = localStorage.getItem('tokenType');
  return `${tokenType} ${token}`;
};

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

const getAdminStart = () => ({
	type: actionTypes.GET_ADMIN.START,
	isFetching: true,
});

const getAdminSuccess = data => ({
	type: actionTypes.GET_ADMIN.SUCCESS,
	isFetching: false,
	adminInfo: data,
});

const getAdminFail = err => ({
	type: actionTypes.GET_ADMIN.FAIL,
	isFetching: false,
	error: err,
});

const updateProfileStart = () => ({
	type: actionTypes.UPDATE_PROFILE_ADMIN.START,
	isFetching: true,
});

const updateProfileSuccess = (mess, data) => ({
	type: actionTypes.UPDATE_PROFILE_ADMIN.SUCCESS,
	isFetching: false,
	message: mess,
	newProfile: data,
	variant: 'success',
});

const updateProfileFail = (err) => ({
	type: actionTypes.UPDATE_PROFILE_ADMIN.FAIL,
	isFetching: false,
	error: err,
	variant: 'error',
});

const updatePasswordStart = () => ({
	type: actionTypes.UPDATE_PASSWORD_ADMIN.START,
	isFetching: true,
});

const updatePasswordSuccess = (mess) => ({
	type: actionTypes.UPDATE_PASSWORD_ADMIN.SUCCESS,
	isFetching: false,
	message: mess,
	variant: 'success',
});

const updatePasswordFail = err => ({
	type: actionTypes.UPDATE_PASSWORD_ADMIN.FAIL,
	isFetching: false,
	error: err,
	variant: 'error',
});

export const updatePasswordAdmin = (data) => {
	return dispatch => {
		dispatch(updatePasswordStart());
		dispatch(showLoading());
		const path = 'auth/password';
		axios.put(path, data, {
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': getAccessToken(),
			},
		})
			.then(response => {
				dispatch(updatePasswordSuccess(response.data.message));
				dispatch(hideLoading());
			})
			.catch(err => {
				dispatch(updatePasswordFail(err.response.data.message));
			});
	};
};

export const updateProfileAdmin = (data) => {
	return dispatch => {
		dispatch(updateProfileStart());
		dispatch(showLoading());
		const path = 'auth/profile';
		axios.patch(path, data, {
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': getAccessToken(),
			},
		})
			.then(response => {
				dispatch(updateProfileSuccess(response.data.message, data));
				dispatch(hideLoading());
			})
			.catch(err => {
				dispatch(updateProfileFail(err));
			});
	};
};

export const getAdmin = () => {
	return dispatch => {
		dispatch(getAdminStart());
		dispatch(showLoading());
		const path = 'auth/user';
		axios.get(path, {
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': getAccessToken(),
			},
		})
			.then(response => {
				localStorage.setItem('avatar', response.data.info.image);
				dispatch(getAdminSuccess(response.data.info));
				dispatch(hideLoading());
			})
			.catch(err => {
				dispatch(getAdminFail(err));
			});
	};
};

export const auth = data => {
  return dispatch => {
    dispatch(authStart());
		dispatch(showLoading());
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
				token = response.data.token.access_token;
				let tokenType = response.data.token.token_type;
				message = response.data.message;
				const expirationDate = new Date(new  Date().getTime() + 3600 * 1000);
				localStorage.setItem('accessToken', token);
				localStorage.setItem('tokenType', tokenType);
				localStorage.setItem('expirationDate', expirationDate);
				dispatch(authSuccess(token, message));
				dispatch(hideLoading());
			})
			.catch(err => {
				dispatch(authFail(err));
			});
  };
};

export const closeAuthAlert = () => ({
	type: actionTypes.CLOSE_ALERT_AUTH,
});