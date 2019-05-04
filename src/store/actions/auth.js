import * as actionTypes from './actionTypes';
import axios from '../../shared/api';

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
				console.log(response);
				dispatch(updatePasswordSuccess(response.data.message));
			})
			.catch(err => {
				console.log(err.response);
				dispatch(updatePasswordFail(err.response.data.message));
			});
	};
};

export const updateProfileAdmin = (data) => {
	console.log('data update --', data);
	return dispatch => {
		dispatch(updateProfileStart());
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
				console.log('response update', response.data.message);
				dispatch(updateProfileSuccess(response.data.message, data));
			})
			.catch(err => {
				console.log(err);
				dispatch(updateProfileFail(err));
			});
	};
};

export const getAdmin = () => {
	return dispatch => {
		dispatch(getAdminStart());
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
			})
			.catch(err => {
				console.log(err);
				dispatch(getAdminFail(err));
			});
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

export const closeAuthAlert = () => ({
	type: actionTypes.CLOSE_ALERT_AUTH,
});