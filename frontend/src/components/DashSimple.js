//@ts-ignore

import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import DashComponent from "./DashComponent";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import CardDeck from "react-bootstrap/CardDeck";

import { API_BASE_URL, CURRENTUSER } from "../constants/apiConstants";

export default function DashSimple() {
  //const [data, setData] = useState("");

  const initialStateArray = [];
  const [a, setA] = useState(0);
  const [tick, setTick] = useState(0);
  const [curr, setCurrent] = useState([0, 0, 0]);
  const [productionArray, setProductionArray] = useState(initialStateArray);
  const [consumptionArray, setConsumptionArray] = useState(initialStateArray);
  const [windArray, setWindArray] = useState(initialStateArray);

  const dataLimit = 9;

  const fetchData = (limit) => {
    const url =
      API_BASE_URL +
      "/prosumerlog/" +
      localStorage.getItem(CURRENTUSER) +
      "/getlatest/" +
      limit;

    return axios
      .get(url)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const setStates = (inData) => {

    setProductionArray((oldArray) => {
        if (oldArray.length > dataLimit) {
          oldArray.shift();
        }
        return [...oldArray, { tick: inData.tick, value: inData.production }];
      });

      setConsumptionArray((oldArray) => {
        if (oldArray.length > dataLimit) {
          oldArray.shift();
        }
        return [
          ...oldArray,
          { tick: inData.tick, value: inData.consumption },
        ];
      });

      setWindArray((oldArray) => {
        if (oldArray.length > dataLimit) {
          oldArray.shift();
        }
        return [
          ...oldArray,
          { tick: inData.tick, value: inData.weather.wind_speed },
        ];
      });

  }

  const initializeData = (latestLogs) => {
    console.log("init data");
    setCurrent([
      latestLogs[0].production,
      latestLogs[0].consumption,
      latestLogs[0].weather.wind_speed,
    ]);

    latestLogs.forEach((element) => {
      //måste bli bättre än såhär på något sätt, right?
      setStates(element);
    });
  };

  const updateData = (res) => {
    var res = res[0];
    setTick(res.tick);

    if (res.tick === tick) {
      //same tick? dont change anythin.
      return null;
    } else {
      setCurrent([res.production, res.consumption, res.weather.wind_speed]);

      setStates(res);
    }
  };

  useEffect(() => {
    // maybe move to moveTimeout?
    if (a != 1) {
      fetchData(dataLimit).then((latestLogs) => {
        initializeData(latestLogs);
      });
      setA(1);
    }
    const interval = setInterval(() => {
      fetchData(1).then((res) => {
        updateData(res);
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [tick]); //actually update states when the tick has changed.

  return (
    <Container className="fluid">
      <Row>
        <CardDeck>
          <DashComponent
            dataType={"Production"}
            display={productionArray}
            current={curr[0]}
            strokeColor={"#4655f5"}
          />
          <DashComponent
            dataType={"Consumption"}
            display={consumptionArray}
            current={curr[1]}
            strokeColor={"#1edc00"}
          />
          <DashComponent
            dataType={"Windspeed"}
            display={windArray}
            current={curr[2]}
            strokeColor={"#ff3c28"}
          />
        </CardDeck>
      </Row>
    </Container>
  );
}
