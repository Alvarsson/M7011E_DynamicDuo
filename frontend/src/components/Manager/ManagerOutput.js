//@ts-ignore

import React from "react";
import Container from "react-bootstrap/esm/Container";
import ListGroup from "react-bootstrap/ListGroup";
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/esm/Row";

export default function ManagerOutput(props) {
  return (
    <Container>
      <Row>
        <Col>
          <Image src="/logo192.png" fluid></Image>
        </Col>
        <Col>
          <Row>
            <ListGroup variant="flush">
              <ListGroup.Item>
                Number of Consumers: {props.data.nr_of_consumers}
              </ListGroup.Item>
              <ListGroup.Item>
                Production: {props.data.production}
              </ListGroup.Item>
              <ListGroup.Item>
                Market Price: {props.data.market_price}
              </ListGroup.Item>
              <ListGroup.Item>
                Battery Level: {props.data.battery_level}
              </ListGroup.Item>
              <ListGroup.Item>
                Plant Consumption:{props.data.power_plant_consumption}
              </ListGroup.Item>
              <ListGroup.Item>
                Total Net Consumption:{props.data.total_net_consumption}
              </ListGroup.Item>
            </ListGroup>
          </Row>
        </Col>
        
      </Row>
      <Row>
          <Image src="/logo192.png"></Image>
        </Row>
    </Container>
  );
}
