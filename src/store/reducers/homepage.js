import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility'

const initialState = {
  loading: false,
  statistic: {},
};

const getStatisticStart = (state, action) => updateObject(state, {
  loading: true,
})

const getStatisticSuccess = (state, action) => updateObject(state, {
  statistic: action.statistic,
  loading: false,
})

const getStatisticFail = (state, action) =>  updateObject(state, {
  
});

const homepage = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_STATISTIC.START: return getStatisticStart(state, action);
    case actionTypes.GET_STATISTIC.SUCCESS: return getStatisticSuccess(state, action);
    case actionTypes.GET_STATISTIC.FAIL: return getStatisticFail(state, action);
    default: return state;
  }
}

export default homepage;
