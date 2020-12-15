//@ts-ignore

import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/esm/Row";
import { API_BASE_URL } from "../../constants/apiConstants";

import ManagerOutput from './ManagerOutput';

export default function ManagerMain() {
  //useState är bara en funktion som react använder så den vet när den ska rendera
  const [tick, setTick] = useState(0); //vill man använda tick använder man den variabeln
  const [data, setData] = useState({}); //vill man ändra värdet kallar man på setData osv
  //funktionstyperna som har use innan kallas för hooks.

  const fetchData = () => {
    const url = API_BASE_URL + "/managerlog/getlatest/";

    return axios
      .get(url)
      .then(({ data }) => {
        return data[0];
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const updateData = (res) => {
    try {
      if (res.tick === tick) {
        //same tick? dont change anythin.
        console.log("no need to rerender. We are on the same tick as before")
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
      fetchData().then((res) => {
        updateData(res);
        console.log("did an update")
        
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [tick]); //actually update states when the tick has changed.

  return (
    <div>
      <ManagerOutput data={data} />
    </div>
  );
}
