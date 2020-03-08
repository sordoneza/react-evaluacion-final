import React, { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useAuth } from "../../utilities/Auth";
import { saveResult, clearResults } from "../../utilities/ResultStorage";

import Container from "../../component/Container";
import questions from "../../utilities/questions";

const maxFormId = questions[questions.length - 1].id;

// Componente react que recibe un arreglo de formularios
// y renderiza uno a uno segun se va navegando con el boton
// siguiente
const NavForm = ({ forms }) => {
  const [currentFormIdx, setCurrentFormIdx] = useState(0);

  const auth = useAuth();
  const history = useHistory();

  const onSubmitForm = values => {
    // Construccion del objeto resultado actual
    const currentResult = {
      pregunta: forms[currentFormIdx].props.title,
      respuesta: values.filter(opt => opt.selected)[0].nombreOpcion
    };

    // Si es el primer formulario enviado se limpia el localstorage
    // que almacena los resultados de manera que se vuelva a iniciar
    if (currentFormIdx === 0) {
      clearResults();
    }

    // Guardar el resultado en localStorage
    saveResult(currentResult);

    if (currentFormIdx + 1 < forms.length) {
      setCurrentFormIdx(currentFormIdx + 1);
    } else if (currentFormIdx === forms.length - 1) {
      auth.sendPoll(() => history.push("/resultado"));
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

  // Arreglo de forms
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
