import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";

function ListItem(props) {
  

  return (
    <div>
      
     <ListGroup.Item>{props.name} is currently {props.status}</ListGroup.Item>
      
    </div>
  );
}
export default ListItem;
