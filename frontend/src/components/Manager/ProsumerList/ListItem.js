import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";


import Container from "react-bootstrap/esm/Container";

import BlockComponent from "./BlockComponent";

function ListItem(props) {

    const [showComponent, setToggle] = useState("");

  const showOverview = (e) => {
      e.preventDefault();
    setToggle(!showComponent);
  };

  return (
    <div>
      <ListGroup.Item>
        <Container>
          <Row>
            <Col>
              <svg
                version="1.1"
                height="10px"
                width="10px"
                xmlns="http://www.w3.org/2000/svg"
              >
                {props.online ? (
                  <circle cx="4" cy="4" r="4" fill="green" />
                ) : (
                  <circle cx="4" cy="4" r="4" fill="red" />
                )}
              </svg>
            </Col>
            <Col>
              <Button variant="primary" id={props.id} onClick={props.pickUser}>
                Show {props.name}
              </Button>
            </Col>
            <Col>
              <Alert variant={props.status > 0 ? "danger" : "success"}>
                {props.status == 0 ? "running" : "blocked "}
                {props.status == 0 ? "" : props.status}
              </Alert>
            </Col>
            <Col>
              <BlockComponent id={props.name} />
            </Col>
            
          </Row>

          
        
          
        </Container>
      </ListGroup.Item>
    </div>
  );
}
export default ListItem;
