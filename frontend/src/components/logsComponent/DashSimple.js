//@ts-ignore

import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import DashComponent from "./DashComponent";
import LabelCollection from "./LabelCollection";
import MultiLine from "./MulitLineGraph";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import CardDeck from "react-bootstrap/CardDeck";
import Image from "react-bootstrap/Image";

import { API_BASE_URL, CURRENTUSER } from "../../constants/apiConstants";
import Card from "react-bootstrap/esm/Card";

export default function DashSimple(props) {
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
  const [curr, setCurrent] = useState([0, 0]);
  const [netProductionArray, setNetProductionArray] = useState(
    initialStateArray
  );
  const [img_url, setImgUrl] = useState("");
  const [consumptionArray, setConsumptionArray] = useState([{}]);
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
    console.log(inData);
    setLabelsData({
      battery_level: inData.battery_level,
      broken_turbine: inData.broken_turbine,
    });

    setImgUrl(inData.img_url);

    setNetProductionArray((oldArray) => {
      if (oldArray.length > dataLimit) {
        oldArray.shift();
      }
      return [...oldArray, { tick: inData.tick, value: inData.net_production }];
    });

    setConsumptionArray((oldArray) => {
      if (oldArray.length > dataLimit) {
        oldArray.shift();
      }
      console.log(oldArray);
      return [
        ...oldArray,
        {
          tick: inData.tick,
          production: inData.production,
          consumption: inData.consumption,
        },
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
  };

  const initializeData = (latestLogs) => {
    console.log("init data");

    if (typeof latestLogs[0] === "undefined") {
      console.log("latest logs undefined");
      setCurrent([0, 0]);
      return;
    }
    setCurrent([
      latestLogs[0].net_production,
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
        setCurrent([res.net_production, res.weather.wind_speed]);

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
            dataType={"Net-Production"}
            display={netProductionArray}
            current={curr[0]}
            strokeColor={"#4655f5"}
          />
          <MultiLine
            dataType={"Production and Consumption"}
            display={consumptionArray}
            current="wat"
            strokeColor={"#1edc00"}
          />
          <DashComponent
            dataType={"Windspeed"}
            display={windArray}
            current={curr[1]}
            strokeColor={"#ff3c28"}
          />
        </CardDeck>

        <Container style={{ margin: "20px 0px 10px 0px" }}>
          <Row>
            <Col>
              <CardDeck>
                <Card style={{ width: "30vw" }} bg="light">
                  <Card.Title>Current Data</Card.Title>
                  <LabelCollection
                    broken_turbine={
                      labelsData.broken_turbine ? "Broken" : "Working"
                    } //true means Broken, false means Working. TODO: CLean this.
                    battery_level={labelsData.battery_level}
                  />
                </Card>
              </CardDeck>
            </Col>
            <Col>
              <Image src={props.img_url} fluid></Image>
            </Col>
          </Row>
        </Container>
      </Row>
    </Container>
  );
}
