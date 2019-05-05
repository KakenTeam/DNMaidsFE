import { combineReducers } from 'redux';

import auth from './auth';
import admin from './admin';
import contracts from './contracts';

export default combineReducers({
  auth,
  admin,
  contracts,
});