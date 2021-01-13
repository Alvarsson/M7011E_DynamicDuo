import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/esm/Row";
import axios from "axios";
import { API_BASE_URL } from "../../../constants/apiConstants";

import Container from "react-bootstrap/esm/Container";

function BlockComponent(props) {
  const [input, setInput] = useState("");

  

  const handleSubmitClick = (e) => {
    const payload = {
      market_price: parseInt(input),
    };
    const request = API_BASE_URL + "/managerlogs/price"
    console.log(request)

    axios
      .put(request, payload)
      .then(function (response) {
        if (response.status === 200) {
          console.log(response);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Form>
      <Form.Group>
        <Row>
          <Col>
            <Form.Control type="text" id="market_price" placeholder="ticks" value={input} onInput={e => setInput(e.target.value)} />
          </Col>
          <Col>
            <Button variant="danger" onClick={handleSubmitClick}>
              Set
            </Button>
          </Col>
        </Row>
      </Form.Group>
    </Form>
  );
}


export default BlockComponent;
