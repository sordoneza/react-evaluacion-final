import React from "react";
import { Redirect } from "react-router-dom";

import styled from "styled-components";
import { loadResults } from "../../utilities/ResultStorage";
import { useAuth } from "../../utilities/Auth";

const StyledDiv = styled.div`
  margin: 10px;
  padding: 10px;
  background-color: lightgray;
  border-radius: 10px;
  width: 300px;
`;

const Resultado = ({ pregunta, respuesta }) => {
  return (
    <StyledDiv>
      <h6>{pregunta}</h6>
      <em>{respuesta}</em>
    </StyledDiv>
  );
};

export default () => {
  const auth = useAuth();

  const results = loadResults();

  if (!auth.isAuthenticated) return <Redirect to="/login" />;

  if (!auth.endedPoll) return <Redirect to="/" />;

  return (
    <div>
      <h4>Resultado de la Encuesta</h4>
      {results.map((element, idx) => {
        return <Resultado key={idx} {...element} />;
      })}
    </div>
  );
};
