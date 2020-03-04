import React from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../../utilities/Auth";

import Container from "../../component/Container";
import questions from "../../utilities/questions";

const Home = () => {
  const auth = useAuth();

  if (!auth.isAuthenticated) return <Redirect to="/login" />;

  return (
    <div>
      <h2>Encuesta</h2>
      {questions.map((element, idx) => {
        return (
          <Container key={idx} title={element.pregunta}>
            {element.opciones}
          </Container>
        );
      })}
    </div>
  );
};

export default Home;
