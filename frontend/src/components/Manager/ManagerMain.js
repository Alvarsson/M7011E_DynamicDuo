//@ts-ignore

import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/esm/Row";
import { API_BASE_URL } from "../../constants/apiConstants";
import List from "./ProsumerList/List";

import ManagerOutput from "./ManagerOutput";

export default function ManagerMain() {
  //useState är bara en funktion som react använder så den vet när den ska rendera
  const [tick, setTick] = useState(0); //vill man använda tick använder man den variabeln
  const [data, setData] = useState({}); //vill man ändra värdet kallar man på setData osv
  //funktionstyperna som har use innan kallas för hooks.

  const [prosumers, setProsumers] = useState([
    { name: "test", status: "yoloing" },
    { name: "patty", status: "irishing" },
  ]);

  const fetchData = () => {
    const currentDataUrl = API_BASE_URL + "/managerlog/getlatest/";
    const prosumersUrl = API_BASE_URL + "/prosumersettings";

    axios.all([axios.get(currentDataUrl), axios.get(prosumersUrl)]).then(
      axios.spread((current, prosumerList) => {

        updateData(current.data[0]);
        
        setProsumers(prosumerList.data) //flytta in i updatedata i framtiden kanske
        console.log(prosumers)
    })

    );
  };

  const updateData = (res) => {
    try {
      if (res.tick === tick) {
        //same tick? dont change anythin.
        console.log("no need to rerender. We are on the same tick as before");
        return null;
      } else {
        setTick(res.tick);
        setData(res);
      }
    } catch (error) {
      console.log("no tick");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 3000);

    return () => clearInterval(interval);
  }, [tick]); //actually update states when the tick has changed.

  return (
    <Container>
      <ManagerOutput data={data} />
      <List prosumers={prosumers} />
    </Container>
  );
}
