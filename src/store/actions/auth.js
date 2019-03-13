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

export const auth = (data) => {
  return dispatch => {
    dispatch(authStart());

    // const requestData = JSON.stringify(data);
		// let token = null;
		// let path = '/login';
		// let message = 'Login success';

		// if (isSignup === true) {
		// 	path = '/signup'
		// 	message = 'Sign up success';
		// }

		// axios.post(path, requestData, {
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	}
		// })
		// 	.then(response => {
		// 		if (isSignup) {
		// 			dispatch(authSuccess(token, message));
		// 			return;
		// 		}
		// 		token = response.headers.authorization;
		// 		const rootFolderId = response.data.root_folder_id;
		// 		const expirationDate = new Date(new  Date().getTime() + 3600 * 1000);
		// 		localStorage.setItem('accessToken', token);
		// 		localStorage.setItem('expirationDate', expirationDate);
		// 		localStorage.setItem('rootFolderId', rootFolderId);
		// 		localStorage.setItem('currentId', rootFolderId);
		// 		const info = {
		// 			id: rootFolderId,
		// 			name: "Home",
		// 			parentId: null,
		// 		};
		// 		dispatch(setCurrentParent(info));
		// 		dispatch(authSuccess(token, message));
		// 	})
		// 	.catch(err => {
		// 		dispatch(authFailed(err.response.data.error.detail));
		// 	});
  };
};