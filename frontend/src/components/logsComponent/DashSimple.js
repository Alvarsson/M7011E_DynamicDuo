//@ts-ignore

import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import DashComponent from "./DashComponent";
import LabelCollection from "./LabelCollection";

import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import CardDeck from "react-bootstrap/CardDeck";

import { API_BASE_URL, CURRENTUSER } from "../../constants/apiConstants";
import Card from "react-bootstrap/esm/Card";

export default function DashSimple() {
  //const [data, setData] = useState("");

  const initialStateArray = [
    { tick: -4, value: 0 },
    { tick: -3, value: 0 },
    { tick: -2, value: 0 },
    { tick: -1, value: 0 },
    { tick: 0, value: 0 },
  ];
  const [singleton, setSingleton] = useState(0);
  const [tick, setTick] = useState(0);
  const [labelsData, setLabelsData] = useState({});
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
        console.log(data);
        return data;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const setStates = (inData) => {
    setLabelsData({
      battery_level: inData.battery_level,
      broken_turbine: inData.broken_turbine,
    });


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
      return [...oldArray, { tick: inData.tick, value: inData.consumption }];
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
  };

  const initializeData = (latestLogs) => {
    console.log("init data");

    if (typeof latestLogs[0] === "undefined") {
      console.log("latest logs undefined");
      setCurrent([0, 0, 0]);
      //setStates([]);
      return;
    }
    setCurrent([
      latestLogs[0].production,
      latestLogs[0].consumption,
      latestLogs[0].weather.wind_speed,
    ]);

    latestLogs.reverse().forEach((element) => {
      //måste bli bättre än såhär på något sätt, right?
      setStates(element);
    });
  };

  const updateData = (response) => {
    var res = response[0];

    try {
      setTick(res.tick); //hmm... nu blir väl tick=res.tick? och sen kollar vi? wat

      if (res.tick === tick) {
        //same tick? dont change anythin.
        return null;
      } else {
        setCurrent([res.production, res.consumption, res.weather.wind_speed]);

        setStates(res);
      }
    } catch (error) {
      console.log("no tick");
    }
  };

  useEffect(() => {
    // maybe move to moveTimeout?
    if (singleton !== 1) {
      fetchData(dataLimit + 1).then((latestLogs) => {
        initializeData(latestLogs);
      });
      setSingleton(1);
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
        <Card>
          <Card.Title>Current Data</Card.Title>
          <LabelCollection
            broken_turbine={labelsData.broken_turbine ? "Broken" : "Working"} //true means Broken, false means Working. TODO: CLean this.
            battery_level={labelsData.battery_level}
          />
        </Card>
      </Row>
    </Container>
  );
}
