import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";

import ListItem from "./ListItem";

function List(props) {
  function getListItems() {
    //bör kanske vara props?
  }

  return (
    <div>
      <ListGroup>
        {props.prosumers.map(function (item) {
          return (
            <ListItem
              name={item.id}
              status={item.blocked}
            />
          );
        })}
      </ListGroup>
    </div>
  );
}
export default List;
