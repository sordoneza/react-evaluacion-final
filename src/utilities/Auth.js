// @vendors
import React, { useState, useContext, createContext } from "react";
import axios from "axios";

import validateSession from "./validateSession";
import { loadResults } from "./ResultStorage";
import questions from "./questions";

const Context = createContext({});

export const AuthProvider = props => {
  const [isAuthenticated, setIsAuthenticated] = useState(validateSession());
  const results = loadResults();

  const countResult = results ? results.length : 0;

  const [endedPoll, setEndedPoll] = useState(countResult === questions.length);

  const login = async (user, callback) => {
    console.log(user);
    const res = await axios.post(
      "https://login-test-dga.herokuapp.com/login",
      user
    );

    if (res.data.response) {
      localStorage.setItem("username", user.username);
      localStorage.setItem("password", user.password);

      setIsAuthenticated(true);
      callback();
    }
  };

  const sendPoll = callback => {
    setEndedPoll(true);
    callback();
  };

  return (
    <Context.Provider value={{ isAuthenticated, login, endedPoll, sendPoll }}>
      {props.children}
    </Context.Provider>
  );
};

export const useAuth = () => {
  return useContext(Context);
};
