import React from "react";
import styled from "styled-components";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

const Wrapper = styled.div`
  width: 300px;
  margin: 0 auto;
`;

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    errors: []
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors });
  };

  validate = () => {
    const { username, password } = this.state;
    const errors = {};
    if (!username) {
      errors.username = "Usuario requerido";
    }
    if (!password) {
      errors.password = "Contraseña requerido";
    }
    return errors;
  };

  render() {
    const { username, password, errors } = this.state;
    return (
      <Wrapper>
        <h1>Login</h1>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label htmlFor="username">Usuario</Label>
            <Input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={this.handleChange}
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
              value={password}
              onChange={this.handleChange}
            />
            {errors.password && (
              <FormText color="danger">{errors.password}</FormText>
            )}
          </FormGroup>
          <Button color="primary">Iniciar sesión</Button>
        </Form>
      </Wrapper>
    );
  }
}

export default Login;
