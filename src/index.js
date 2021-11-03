import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { configureStore } from "./redux/Store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "./data";
import Spinner from "./views/spinner/Spinner";

ReactDOM.render(
  <Provider store={configureStore()}>
    <Suspense fallback={<Spinner />}>
      <Router>
        <App />
      </Router>
    </Suspense>
  </Provider>,

  document.getElementById("root")
);
