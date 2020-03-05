// @vendors
import React, { useState, useContext, createContext } from "react";
import axios from "axios";

import validateSession from "./validateSession";

const Context = createContext({});

export const AuthProvider = props => {
  const [isAuthenticated, setIsAuthenticated] = useState(validateSession());
  const [endedPoll, setEndedPoll] = useState(false);

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

  const sendPoll = () => {
    setEndedPoll(true);
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
