import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../../utilities/Auth";

import Container from "../../component/Container";
import questions from "../../utilities/questions";

const maxFormId = questions[questions.length - 1].id;

const NavForm = ({ forms }) => {
  const [currentFormIdx, setCurrentFormIdx] = useState(0);

  const auth = useAuth();

  const onSubmitForm = () => {
    if (currentFormIdx + 1 < forms.length) {
      setCurrentFormIdx(currentFormIdx + 1);
    } else if (currentFormIdx === forms.length - 1) {
      auth.sendPoll();
    }
  };

  return (
    <>
      {React.cloneElement(forms[currentFormIdx], {
        onSubmitForm: onSubmitForm
      })}
    </>
  );
};

const CurrentForm = ({ id, pregunta, opciones, ...props }) => {
  return (
    <Container key={id} title={pregunta} {...props}>
      {opciones}
    </Container>
  );
};

const Home = () => {
  const auth = useAuth();

  const forms = () => {
    return questions.map(element => {
      const form = (
        <CurrentForm
          id={element.id}
          title={element.pregunta}
          opciones={element.opciones}
          last={element.id === maxFormId}
        />
      );

      return form;
    });
  };

  if (!auth.isAuthenticated) return <Redirect to="/login" />;

  return (
    <div>
      <h2>Encuesta</h2>
      <NavForm forms={forms()} />
    </div>
  );
};

export default Home;
