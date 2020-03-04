import React, { useState } from "react";
import { Form, ListGroup, Button } from "reactstrap";
import Option from "../Option";
import CustomAlert from "../../component/CustomAlert";

export default ({ children, title }) => {
  const [options, setOptions] = useState(children);
  const [error, setError] = useState(false);

  const onOptionSelected = id => {
    setOptions(prevOptions =>
      prevOptions.map(opt => {
        opt.selected = opt.id === id;
        return opt;
      })
    );
  };

  const validateSelectedOption = () => {
    const optionsSelected = options.filter(opt => opt.selected);

    setError(optionsSelected.length === 0);
  };

  return (
    <Form onSubmit={e => e.preventDefault()}>
      <h4>{title}</h4>
      <ListGroup>
        {options.map(option => {
          return (
            <Option
              key={option.id}
              onOptionSelected={onOptionSelected}
              {...option}
            />
          );
        })}
      </ListGroup>
      {error && <CustomAlert text="Debe seleccionar una respuesta" />}
      <Button onClick={validateSelectedOption}>Siguiente</Button>
    </Form>
  );
};
