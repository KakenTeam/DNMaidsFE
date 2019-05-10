import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  loading: false,
  feedbacks: [],
  detailFeedback: {},
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

const updateFeedbackStatusSuccess = (state, action) => updateObject(state, { 
    feedbacks: state.feedbacks.map(
      (feedback, i) => feedback.id === state.detailFeedback.id ? { ...feedback, status: action.status.status} 
                        : feedback
    )
  });

const updateFeedbackStatusFail = (state, action) => updateObject(state, {
  loading: false,
  notifications: action.error,
  variant: 'error',
});

const showFeedbackSuccess = (state, action) => updateObject(state, {
  detailFeedback: action.detailFeedback,
  loading: false,
})


const feedbacks = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_FEEDBACKS.START: return getFeedbacksStart(state, action);
    case actionTypes.GET_FEEDBACKS.SUCCESS: return getFeedbacksSuccess(state, action);
    case actionTypes.GET_FEEDBACKS.FAIL: return getFeedbacksFail(state, action);
    case actionTypes.UPDATE_FEEDBACK_STATUS.START: return updateFeedbackStatusStart(state, action);
    case actionTypes.UPDATE_FEEDBACK_STATUS.SUCCESS: return updateFeedbackStatusSuccess(state, action);
    case actionTypes.UPDATE_FEEDBACK_STATUS.FAIL: return updateFeedbackStatusFail(state, action);
    case actionTypes.SHOW_FEEDBACK.SUCCESS: return showFeedbackSuccess(state, action);
    default: return state;
  }
}

export default feedbacks;