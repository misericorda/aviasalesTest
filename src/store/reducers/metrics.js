import {createReducer} from "redux-create-reducer";
import {METRICS_SET_DATA, METRICS_LOADING_STOP, METRICS_LOADING_START} from "../actions/actionTypes"

const initialState = {
  isLoading: false,
  data: null
};


const reducer = createReducer(initialState, {
  [METRICS_LOADING_START](state, action) {
    return {
      ...state,
      isLoading: true
    };
  },
  [METRICS_LOADING_STOP](state, action) {
    return {
      ...state,
      isLoading: false
    };
  },
  [METRICS_SET_DATA](state, action) {
    return {
      ...state,
      data: action.payload
    }
  }
});

export default reducer;