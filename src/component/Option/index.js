import React from "react";
import { ListGroupItem } from "reactstrap";

const Option = ({ id, selected, nombreOpcion, onOptionSelected }) => {
  const onClick = e => {
    e.preventDefault();
    onOptionSelected(id);
  };
  return (
    <ListGroupItem active={selected} tag="button" action onClick={onClick}>
      {nombreOpcion}
    </ListGroupItem>
  );
};

export default Option;
