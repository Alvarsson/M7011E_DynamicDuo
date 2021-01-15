import React, { useState,useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";

import ListItem from "./ListItem";

function List(props) {
  const [currentUser, setUser] = useState("");

  const selectNewUser = (e) => {
    setUser(e.target.id);
  };

  useEffect(() => {
    console.log("did the use effect");
    props.pickUser(currentUser);
  }, [props.tick,currentUser,props.prosumers]); //run useEffect when these values change..

  return (
    <div style={{margin: "20px 0px 20px 0px"}}>
      <ListGroup>
        {props.prosumers.map(function (item) {
            console.log(item)
          return (
            <ListItem
              name={item.id}
              id={item.id}
              status={item.blocked}
              data={item}
              pickUser={selectNewUser}
            />
          );
        })}
      </ListGroup>
    </div>
  );
}
export default List;
