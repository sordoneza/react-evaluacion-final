import React from "react";
import { Switch, Route } from "react-router-dom";
import "./styles.css";

import Login from "../Login";
import Home from "../Home";
import Result from "../Result";

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/resultado" component={Result} />
    </Switch>
  );
}
