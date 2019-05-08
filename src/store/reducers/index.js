import { combineReducers } from 'redux';

import auth from './auth';
import admin from './admin';
import contracts from './contracts';
import { loadingBarReducer } from 'react-redux-loading-bar'

export default combineReducers({
  auth,
  admin,
  contracts,
  loadingBar: loadingBarReducer,
});