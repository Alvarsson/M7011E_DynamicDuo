import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import CardGroup from "react-bootstrap/CardGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/esm/Row";
import axios from "axios";
import { API_BASE_URL } from "../../../constants/apiConstants";
import Alert from "react-bootstrap/Alert";


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
    if (props.id != "") {
      fetchData(1).then((latestLogs) => {
        updateData(latestLogs);
      });
    }
  }, [props.id, props.tick, props.settings]); //actually update states when the tick has changed.

  return (
    <Container>
      <Row>
        <Col>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </Col>
        <Col>
          <pre>{JSON.stringify(props.settings, null, 2)}</pre>
        </Col>
      </Row>
      <Row>
        <CardGroup>
          <Card>
            <Card.Body>
              <Card.Title>{data.id}</Card.Title>
              <Card.Text>
              <Alert variant={data.broken_turbine == false ? "success" : "danger"}>
                {data.broken_turbine == false ? "Working" : "Broken "}
              </Alert>

              <Alert variant={props.settings.blocked > 0 ? "danger" : "success"}>
                {props.settings.blocked > 0 ? "Blocked " : "Running"}
                {props.blocked == 0 ? "" : props.blocked}
              </Alert>

              
              </Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
      </Row>
    </Container>
  );
}

export default Overview;
