//@ts-ignore

import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import DashComponent from "./DashComponent";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import CardDeck from "react-bootstrap/CardDeck";

export default function DashSimple() {
  //const [data, setData] = useState("");

  const initialStateArray = [
    { tick: -3, value: 0 },
    { tick: -2, value: 0 },
    { tick: -1, value: 0 },
  ];

  const [tick, setTick] = useState(0);
  const [curr, setCurrent] = useState([0, 0, 0]);
  const [productionArray, setProductionArray] = useState(initialStateArray);
  const [consumptionArray, setConsumptionArray] = useState(initialStateArray);
  const [windArray, setWindArray] = useState(initialStateArray);

  const fitChartDataToRules = (oldArray, tick, newData) => {
    if (oldArray.length > 9) {
      oldArray.shift();
    }

    oldArray.push({ tick: tick, value: newData });

    return oldArray;
  };

  const fetchData = () => {
    const url = "http://localhost:3001/prosumerlog/lisa2/getlatest";

    return axios
      .get(url)
      .then(({ data }) => {
        return data[0];
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    // maybe move to moveTimeout?

    const interval = setInterval(() => {
      fetchData().then((res) => {
        setTick(res.tick);

        if (res.tick === tick) {
          return null;
        } else {
          setCurrent([res.production, res.consumption, res.weather.wind_speed]);

          //måste bli bättre än såhär på något sätt, right?
          setProductionArray((oldArray) => {
            if (oldArray.length > 5) {
              oldArray.shift();
            }
            return [...oldArray, { tick: res.tick, value: res.production }];
          });

          setConsumptionArray((oldArray) => {
            if (oldArray.length > 5) {
              oldArray.shift();
            }
            return [...oldArray, { tick: res.tick, value: res.consumption }];
          });

          setWindArray((oldArray) => {
            if (oldArray.length > 5) {
              oldArray.shift();
            }
            return [
              ...oldArray,
              { tick: res.tick, value: res.weather.wind_speed },
            ];
          });

          console.log("An update occurred.");
        }
      });
    }, 5000);

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

// <Col>
//           <DashComponent
//             dataType={"Production"}
//             display={productionArray}
//             current={curr[0]}
//             strokeColor={"#4655f5"}
//           />
//         </Col>
//         <Col>
//           <DashComponent
//             dataType={"Consumption"}
//             display={consumptionArray}
//             current={curr[1]}
//             strokeColor={"#1edc00"}
//           />
//         </Col>
//         <Col>
//           <DashComponent
//             dataType={"Windspeed"}
//             display={windArray}
//             current={curr[2]}
//             strokeColor={"#ff3c28"}
//           />
//         </Col>
