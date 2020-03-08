import React, { useState } from "react";
import { Form, ListGroup, Button, FormGroup } from "reactstrap";
import { Formik } from "formik";
import Option from "../Option";
import CustomAlert from "../../component/CustomAlert";
import styled from "styled-components";

const StyledDiv = styled.div`
  margin: 10px;
  padding: 10px;
  background-color: lightgray;
  border-radius: 10px;
`;

export default ({ children, title, ...props }) => {
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
    <Formik
      initialValues={options}
      validate={values => {
        const errors = {};
        const optionsSelected = values.filter(opt => opt.selected);

        if (optionsSelected.length === 0) {
          errors.empty = true;
        }

        return errors;
      }}
      onSubmit={values => {
        props.onSubmitForm(values);
      }}
    >
      {({ values, errors, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <StyledDiv>
            <h4>{title}</h4>
            <FormGroup>
              <ListGroup>
                {values.map(option => {
                  return (
                    <Option
                      key={option.id}
                      onOptionSelected={onOptionSelected}
                      {...option}
                    />
                  );
                })}
              </ListGroup>
            </FormGroup>
            {errors.empty && (
              <CustomAlert text="Debe seleccionar una respuesta" />
            )}

            <Button type="submit">
              {props.last ? "Finalizar" : "Siguiente"}
            </Button>
          </StyledDiv>
        </Form>
      )}
    </Formik>
  );
};
