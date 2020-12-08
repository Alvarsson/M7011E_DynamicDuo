//@ts-ignore

import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import DashComponent from "./DashComponent";

export default function DashSimple() {
  //const [data, setData] = useState("");
  const [tick, setTick] = useState(0);
  const [curr, setCurr] = useState(0);
  const [productionArray, setProductionArray] = useState([
    { tick: -3, value: 0 },
    { tick: -2, value: 0 },
    { tick: -1, value: 0 },
  ]);

  const addEntryClick = () => {
    setTick(tick + 1);
    setCurr(Math.floor(Math.random() * 100));

    setProductionArray((oldArray) => {
      if (oldArray.length > 9) {
        oldArray.shift();
      }
      return [...oldArray, { tick: tick, value: curr }];
    });
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

    //run till we done
    const interval = setInterval(() => {
      fetchData().then((res) => {        
        setTick(res.tick);

        if (res.tick === tick) {
          return null;
        } else {
        
          setCurr(res.production);
          setProductionArray((oldArray) => {
            if (oldArray.length > 9) {
              oldArray.shift();
            }
            return [...oldArray, { tick: res.tick, value: res.production }];
          });
          console.log("An update occurred.");
        }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [tick]); //actually update states when the tick has changed.


  return (
    <Container className="p-3">
      <input type="button" onClick={addEntryClick} value="Add" />

      <DashComponent display={productionArray} current={curr} />
    </Container>
  );
}
