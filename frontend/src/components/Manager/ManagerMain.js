//@ts-ignore

import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/esm/Row";
import { API_BASE_URL } from "../../constants/apiConstants";
import ProsumersController from "./ProsumersController";
import { withRouter } from "react-router-dom";

import ManagerOutput from "./ManagerOutput";
import Overview from "./ProsumerList/Overview";

function ManagerMain() {
  //useState är bara en funktion som react använder så den vet när den ska rendera
  const [tick, setTick] = useState(0); //vill man använda tick använder man den variabeln
  const [data, setData] = useState({}); //vill man ändra värdet kallar man på setData osv
  //funktionstyperna som har use innan kallas för hooks.

  const [prosumers, setProsumers] = useState([]);
  const [managersettings, setManagerSettings] = useState();

  const fetchData = () => {
    const currentDataUrl = API_BASE_URL + "/managerlog/getlatest/";
    const prosumersUrl = API_BASE_URL + "/prosumersettings";
    const managersettingsurl = API_BASE_URL + "/managersettings/get";

    axios
      .all([
        axios.get(currentDataUrl),
        axios.get(prosumersUrl),
        axios.get(managersettingsurl,{withCredentials:true}),
      ])
      .then(
        axios.spread((current, prosumerList, managerSettings) => {
            console.log("settings")
            console.log(managerSettings);
          updateData(current.data[0], prosumerList.data, managerSettings);
        })
      );
  };

  const updateData = (res, prosumerlist, managerSettings) => {
    try {
      if (res.tick === tick) {
        //same tick? dont change anythin.
        console.log("no need to rerender. We are on the same tick as before");
        return null;
      } else {
        setTick(res.tick);
        setProsumers(prosumerlist); 
        setManagerSettings(managerSettings);
        console.log(managerSettings);
        setData(res);
      }
    } catch (error) {
      console.log("no tick");
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
      console.log(prosumers);
    }, 3000);

    return () => clearInterval(interval);
  }, []); //actually update states when the tick has changed.

  //{showComponent ? <Overview data={props.data} /> : null}
  return (
    <Container>

      {managersettings ? (
        <ManagerOutput settings={managersettings} data={data} />
      ) : (
        ""
      )}

      {prosumers.length > 0 ? (
        <ProsumersController prosumers={prosumers} tick={tick} />
      ) : (
        ""
      )}
    </Container>
  );
}

export default withRouter(ManagerMain);
