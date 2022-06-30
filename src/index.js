import App from "./App";
import React from "react";
import ErrorBoundary from "./errorBoundary";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import "./input.css";
import "semantic-ui-css/semantic.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Router>
);
