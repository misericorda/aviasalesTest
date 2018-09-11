import {combineReducers} from "redux";

import metricsReducer from "./metrics";

const rootReducer = combineReducers({
  metrics: metricsReducer,
});

export default rootReducer;