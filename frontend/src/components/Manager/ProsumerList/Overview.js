import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/esm/Row";
import axios from "axios";
import { API_BASE_URL } from "../../../constants/apiConstants";

import Container from "react-bootstrap/esm/Container";

function Overview(props) {
  const [tick, setTick] = useState(0);
  const [data, setData] = useState({});
  const [user, setCurrent] = useState("");
  const [wind, setWind] = useState("wind");
  const [production, setProduction] = useState("prod");
  const [consumption, setConsumption] = useState("cons");

  const fetchData = (limit) => {
    const url =
      API_BASE_URL + "/prosumerlog/" + props.id + "/getlatest/" + limit;

    return axios
      .get(url)
      .then(({ data }) => {
        console.log(data);
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
        console.log("no need to rerender. We are on the same tick as before");
        return null;
      } else {
        setTick(tick);
        setData(res);
      }
    } catch (error) {
      console.log("no tick");
    }
  };

  useEffect(() => {
      if(props.id != ""){
        fetchData(1).then((latestLogs) => {
            updateData(latestLogs);
          });
      }
    
  }, [props.id, props.tick,props.settings]); //actually update states when the tick has changed.

  return (
    <Row>
      <Col>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Col>
      <Col>
        <pre>{JSON.stringify(props.settings, null, 2)}</pre>
      </Col>
    </Row>
  );
}

export default Overview;
