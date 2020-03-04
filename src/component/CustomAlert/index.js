import React from "react";
import { Alert } from "reactstrap";

export default ({ text, color = "danger" }) => {
  return <Alert color={color}>{text}</Alert>;
};
