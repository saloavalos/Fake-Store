import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.scss";
import { Provider } from "react-redux";
import myStore from "./redux/store";

ReactDOM.render(
  <Provider store={myStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
