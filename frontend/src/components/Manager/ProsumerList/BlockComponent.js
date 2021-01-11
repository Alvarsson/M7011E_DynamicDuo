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
    <Form>
      <Form.Group>
        <Row>
          <Col>
            <Form.Control type="text" id="blocked" placeholder="ticks" value={input} onInput={e => setInput(e.target.value)} />
          </Col>
          <Col>
            <Button variant="primary" onClick={handleSubmitClick}>
              Block
            </Button>
          </Col>
        </Row>
      </Form.Group>
    </Form>
  );
}

{
  /* <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
  <form>
    <input
      type="text"
      className="form-control"
      id="userID"
      placeholder="Enter id"
      value={props.userID}
      onChange={handleChange}
    />
    <button
      type="submit"
      className="btn btn-primary"
      onClick={handleSubmitClick}
    >
      Submit
    </button>
  </form>
</div>; */
}

export default BlockComponent;
