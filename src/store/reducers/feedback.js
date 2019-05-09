import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  loading: false,
  feedbacks: [],
  detailFeeback: {},
  notifications: '',
  variant: '',
};

const getFeedbacksStart = (state, action) => updateObject(state, {
  loading: true,
});

const getFeedbacksSuccess = (state, action) => updateObject(state, {
  feedbacks: [...action.feedbacks],
  loading: false,
});

const getFeedbacksFail = (state, action) => updateObject(state, {
  
});

const feedbacks = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_FEEDBACKS.START: return getFeedbacksStart(state, action);
    case actionTypes.GET_FEEDBACKS.SUCCESS: return getFeedbacksSuccess(state, action);
    case actionTypes.GET_FEEDBACKS.FAIL: return getFeedbacksFail(state, action);
    default: return state;
  }
}

export default feedbacks;