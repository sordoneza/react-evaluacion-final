import React from "react";
import { Switch, Route } from "react-router-dom";
import "./styles.css";

import Login from "../Login";
import Home from "../Home";

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
    </Switch>
  );
}
