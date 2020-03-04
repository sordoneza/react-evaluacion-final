import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./containers/App";
import { AuthProvider } from "./utilities/Auth";
import "bootstrap/dist/css/bootstrap.min.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <AuthProvider>
    <Router>
      <App />
    </Router>
  </AuthProvider>,
  rootElement
);
