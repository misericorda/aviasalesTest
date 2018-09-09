import "regenerator-runtime/runtime"
import {createStore, combineReducers, compose, applyMiddleware} from "redux";
import createSagaMiddleware from "redux-saga"

import metricsReducer from "./reducers/metrics"
import rootSaga from "./sagas/index"

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  metrics: metricsReducer,
});
let composeEnhancers = compose;

if (process.env.mode === "development") {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}

const configureStore = () => {
  let store = createStore(rootReducer, compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
  sagaMiddleware.run(rootSaga);
  return store;
};
// const configureStore = (initialState = {}) => {
//   return createStore(rootReducer, initialState, compose(
//     applyMiddleware(thunk),
//     window.devToolsExtension ? window.devToolsExtension() : f => f
//   ));
// };



export default configureStore;