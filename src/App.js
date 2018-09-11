import React from "react";
import {Provider} from "react-redux";
import {hot} from "react-hot-loader";
import Main from "./components/Main";

const App = props => (
  <Provider store={props.store}>
    <Main/>
  </Provider>
);

export default module.hot ? hot(module)(App) : App;