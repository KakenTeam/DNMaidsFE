import { combineReducers } from 'redux';

import auth from './auth';
import admin from './admin';
import contracts from './contracts';
import feedbacks from './feedback';
import { loadingBarReducer } from 'react-redux-loading-bar'
import feedbacks from './feedback';

export default combineReducers({
  auth,
  admin,
  contracts,
  feedbacks,
  loadingBar: loadingBarReducer,
});