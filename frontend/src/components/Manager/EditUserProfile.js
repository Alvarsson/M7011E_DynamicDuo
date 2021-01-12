import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Alert from "react-bootstrap/Alert";
import { withRouter } from "react-router-dom";
import { API_BASE_URL } from "../../constants/apiConstants";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Container from "react-bootstrap/esm/Container";

function EditUserProfile(props) {
  const [showComponent, setToggle] = useState("");
  const [input, setInput] = useState("");

  function editUser(e) {
    console.log(e.target.id);
    props.history.push("/edit/" + e.target.id);
  }

  function handleSubmitClick (e) {
    const payload = {
      blocked: input,
    };
    const request = API_BASE_URL + "/prosumersettings/"+ props.id +"/block"
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
    <Container>
      <Row>
        <Form>
          <Form.Group>
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  id="blocked"
                  placeholder="ticks"
                  value={input}
                  onInput={(e) => setInput(e.target.value)}
                />
              </Col>
              <Col>
                <Button variant="danger" onClick={handleSubmitClick}>
                  Block
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Row>
    </Container>
  );
}
export default withRouter(EditUserProfile);
