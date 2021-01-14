import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import CardDeck from "react-bootstrap/CardDeck";
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
        console.log(latestLogs);
      });
    }
  }, [props.id, props.tick, props.settings]); //actually update states when the tick has changed.

  return (
    <Container >
      <Row >
        <CardDeck >
          
            <Card >
              <Card.Body>
                <Card.Title>{data.id}</Card.Title>
                <Card.Text>
                  <Alert
                    variant={
                        props.settings.broken == false ? "success" : "danger"
                    }
                  >
                    {props.settings.broken == false ? "Working" : "Broken "}
                  </Alert>

                  <Alert
                    variant={props.settings.blocked > 0 ? "danger" : "success"}
                  >
                    {props.settings.blocked > 0 ? "Blocked " : "Running"}
                  </Alert>
                </Card.Text>
              </Card.Body>
            </Card>
           
            <Card >
              <Card.Body>
                <Card.Title>Distribution</Card.Title>
                <Card.Text>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      Sell: {props.settings.distribution.sell}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Buy: {props.settings.distribution.buy}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Drain: {props.settings.distribution.drain}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Store: {props.settings.distribution.store}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Battery Warning threshold:{" "}
                      {props.settings.battery_warning_threshold}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Text>
              </Card.Body>
            </Card>
          
            {data.weather ? (
              <Card >
                <Card.Body>
                  <Card.Title>Variables</Card.Title>
                  <Card.Text>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        Production: {data.production}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Consumption: {data.consumption}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Net production: {data.net_production}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Wind speed: {data.weather.wind_speed}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Temperature: {data.weather.temperature}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Battery: {data.battery_level}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Text>
                </Card.Body>
              </Card>
            ) : (
              ""
            )}
          
        </CardDeck>
      </Row>
    </Container>
  );
}

export default Overview;
