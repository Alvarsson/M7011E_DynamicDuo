//@ts-ignore

import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/esm/Row";
import { API_BASE_URL } from "../../constants/apiConstants";
import List from "./ProsumerList/List";

import ManagerOutput from "./ManagerOutput";
import Overview from "./ProsumerList/Overview";

export default function ProsumerController(props) {
  const [selectedUser, setUser] = useState("");
  const [selectedUserSettings, setUserSettings] = useState("");

  const selectNewUser = (newName) => {
    setUser(newName);

    var userSettings = props.prosumers.filter((obj) => {
        
      return obj.id === newName;
    });
    console.log(userSettings)
    setUserSettings(userSettings);
  };

  return (
    <Container>
      <Overview
        id={selectedUser}
        tick={props.tick}
        settings={selectedUserSettings}
      />
      <List prosumers={props.prosumers} pickUser={selectNewUser} />
    </Container>
  );
}
