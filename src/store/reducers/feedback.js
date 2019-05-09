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

const updateFeedbackStatusStart = (state, action) => updateObject(state, {
  loading: true,
});

const updateFeedbackStatusSuccess = (state, action) => {
  const newUpdate = {
    ...state.detailFeeback,
    ...action.status,
  };

  return updateObject(state, {
    loading: false,
    notifications: action.message,
    detailFeeback: newUpdate,
    variant: 'success',
  });
};

const updateFeedbackStatusFail = (state, action) => updateObject(state, {
  loading: false,
  notifications: action.error,
  variant: 'error',
});


const feedbacks = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_FEEDBACKS.START: return getFeedbacksStart(state, action);
    case actionTypes.GET_FEEDBACKS.SUCCESS: return getFeedbacksSuccess(state, action);
    case actionTypes.GET_FEEDBACKS.FAIL: return getFeedbacksFail(state, action);
    case actionTypes.GET_FEEDBACKS.START: return updateFeedbackStatusStart(state, action);
    case actionTypes.GET_FEEDBACKS.SUCCESS: return updateFeedbackStatusSuccess(state, action);
    case actionTypes.GET_FEEDBACKS.FAIL: return updateFeedbackStatusFail(state, action);
    default: return state;
  }
}

export default feedbacks;