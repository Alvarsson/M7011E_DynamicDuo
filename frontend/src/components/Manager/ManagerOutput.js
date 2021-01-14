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

import ControlPanel from "./ControlPanel";
import PriceChanger from "./PriceChanger";
import ProductionChanger from "./ProductionChanger";



export default function ManagerOutput(props) {
  return (
    <Container style={{ margin: "20px" }} margin={{}}>
      <Row>
        <Col>
          <Image src={props.settings.data.img_url} fluid></Image>
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
                Plant Consumption:{props.settings.power_plant_consumption}
              </ListGroup.Item>

              <ListGroup.Item>
                Recommended Market Price (RMP):{" "}
                {props.data.recommended_market_price}
              </ListGroup.Item>
              <ListGroup.Item>
                Market Price: {props.data.market_price}
              </ListGroup.Item>
              <ListGroup.Item>
                Market Demand:{props.data.market_demand}
              </ListGroup.Item>
              <ListGroup.Item>
                Battery Level: {props.data.battery_level}
              </ListGroup.Item>
            </ListGroup>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          {props.settings.data.distribution.store >= 0 ? (
            <ControlPanel dist={props.settings.data.distribution.store} />
          ) : (
            ""
          )}
        </Col>
        <Col>
          <PriceChanger />
          <ProductionChanger />
        </Col>
      </Row>
    </Container>
  );
}
