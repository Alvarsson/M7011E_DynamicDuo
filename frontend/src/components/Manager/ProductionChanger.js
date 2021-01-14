import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/esm/Row";
import axios from "axios";
import { API_BASE_URL } from "../../constants/apiConstants";

import Container from "react-bootstrap/esm/Container";
import FormGroup from "react-bootstrap/esm/FormGroup";

function ProductionChanger(props) {
  const [input, setInput] = useState("");

  

  const handleSubmitClick = (e) => {
    const payload = {
        inc_prod_change: {
            timer: 3,
            new_prod: parseInt(input),
        }
    };
    const request = API_BASE_URL + "/managersettings/inc_prod_change"
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
          <Col xs={2} lg="2">
            <Form.Label>Production:</Form.Label>
            </Col>
          <Col xs={6}>
            <Form.Control type="text" id="production" placeholder="Production" value={input} onInput={e => setInput(e.target.value)} />
          </Col>
          <Col>
            <Button variant="secondary" onClick={handleSubmitClick}>
              Set
            </Button>
          </Col>
        </Row>
      </Form.Group>
    </Form>
  );
}


export default ProductionChanger;
