import React from "react";
import {render} from "react-dom";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faFilter, faShoppingCart, faCircleNotch} from "@fortawesome/free-solid-svg-icons";
import configureStore from "./store/configureStore";
import App from "./App";
import "./styles/app.scss";

library.add(faFilter, faShoppingCart, faCircleNotch);
let store = configureStore();

render(<App store={store}/>, document.getElementById("app"));