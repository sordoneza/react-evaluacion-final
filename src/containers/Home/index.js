import React from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../../utilities/Auth";

const Home = () => {
  const auth = useAuth();
  return auth.isAuthenticated ? <h2>Home</h2> : <Redirect to="/login" />;
};

export default Home;
