import React, { useState } from "react";
import { Form, ListGroup } from "reactstrap";
import Option from "../Option";

export default ({ children, title }) => {
  const [options, setOptions] = useState(children);
  const onOptionSelected = id => {
    setOptions(prevOptions =>
      prevOptions.map(opt => {
        opt.selected = opt.id === id;
        return opt;
      })
    );
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
    </Form>
  );
};
