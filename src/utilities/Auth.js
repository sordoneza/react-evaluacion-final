// @vendors
import axios from "axios";

export const login = async (user, callback) => {
  console.log(user);
  const res = await axios.post(
    "https://login-test-dga.herokuapp.com/login",
    user
  );

  if (res.data.response) {
    callback();
  }
};
