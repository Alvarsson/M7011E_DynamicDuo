import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";

import ListItem from "./ListItem"

function List(props) {
  function getListItems() {
    //bör kanske vara props?

    
   
  }

  return (
    <div>
      <ListGroup>
        {props.prosumers.map(function (item) {
          return <ListItem name={item.name} status={item.status} />
        })}
      </ListGroup>
    </div>
  );
}
export default List;
