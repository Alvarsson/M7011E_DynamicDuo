//@ts-ignore

import React from "react";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
export default function LabelCollection(props) {
  return (
    <Container>
      
      <Row> 
        <Col className="text-center">
          Wind Turbine Status
        </Col>
        <Col>
        <Alert
        variant={
            props.broken == 0 ? "success" : "danger"
        }>
        {props.broken == 0 ? "Working" : "Broken "}
      </Alert>
        </Col>
      </Row>
      <Row> 
        <Col className="text-center">
          Manager Blocked Status
        </Col>
        <Col>
        <Alert
        variant={
            props.blocked == 0 ? "success" : "danger"
        }>
        {props.blocked == 0 ? "Not Blocked" : "Blocked "}
        {props.blocked > 0 ? ("   "+ props.blocked * 10 + "s") : ""}
      </Alert>
        </Col>
      </Row>
      <Row> 
        <Col className="text-center">
          Blackout Status
        </Col>
        <Col>
        <Alert
        variant={
            props.blackout == false ? "success" : "danger"
        }>
        {props.blackout == false ? "Power On" : "Blackout"}
      </Alert>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
        Battery Level
        </Col>
        <Col>
        {props.battery_level}
        </Col>
        </Row>

    </Container>
  ); ///*<Tooltip />*/
}
