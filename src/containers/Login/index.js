import React, { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import styled from "styled-components";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

import { useAuth } from "../../utilities/Auth";

const Wrapper = styled.div`
  width: 300px;
  margin: 0 auto;
`;

const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState([]);

  const history = useHistory();
  const auth = useAuth();

  if (auth.isAuthenticated) return <Redirect to="/" />;

  const handleChange = e => {
    const property = { [e.target.name]: e.target.value };
    const newuser = Object.assign({}, user, property);

    setUser(newuser);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validate();

    if (errors.username || errors.password) {
      setErrors(errors);
    } else {
      auth.login(user, () => history.push("/"));
    }
  };

  const validate = () => {
    const errors = {};
    if (!user.username) {
      errors.username = "Usuario requerido";
    }
    if (!user.password) {
      errors.password = "Contraseña requerido";
    }
    return errors;
  };

  return (
    <Wrapper>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="username">Usuario</Label>
          <Input
            id="username"
            name="username"
            type="text"
            value={user.username}
            onChange={handleChange}
          />
          {errors.username && (
            <FormText color="danger">{errors.username}</FormText>
          )}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Contraseña</Label>
          <Input
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
          />
          {errors.password && (
            <FormText color="danger">{errors.password}</FormText>
          )}
        </FormGroup>
        <Button color="primary">Iniciar sesión</Button>
      </Form>
    </Wrapper>
  );
};

export default Login;
