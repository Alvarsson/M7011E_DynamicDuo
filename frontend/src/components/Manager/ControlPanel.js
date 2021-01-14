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

import Distribution from "./DistributionComponent/Distribution"

export default function ControlPanel(props) {
  return (
    <Container>
      <Row>
        <Distribution initialValueA={props.dist}/>       
      </Row>
    </Container>
  );
}
