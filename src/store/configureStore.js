import "regenerator-runtime/runtime";
import {createStore, compose, applyMiddleware} from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
  let store = createStore(rootReducer, compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
  sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;