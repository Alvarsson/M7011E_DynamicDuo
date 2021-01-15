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
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");


  function handleDeleteUser (e) {
    const payload = {
      blocked: user,
    };
    const request = API_BASE_URL + "/prosumersettings/"+ props.match.params.id +"/delete"
    console.log(request)

    if(props.match.params.id == user){ //kanske bör rycka user.Fast nä, finns gammal data också
        axios
        .delete(request, payload)
        .then(function (response) {
          if (response.status === 200) {
            console.log(response);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    else{
        console.log(user) 

       console.log("user!=id") 
    }
    
  };

  function handlePasswordChange (e) {
    const payload = {
        login_credentials :{
          password: password
        }
    };

    const request = API_BASE_URL + "/prosumersettings/"+ props.match.params.id +"/password"
    console.log(payload)
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
                  placeholder="Password"
                  value={password}
                  onInput={(e) => setPassword(e.target.value)}
                />
              </Col>
              <Col>
                <Button variant="primary" onClick={handlePasswordChange}>
                  Set New Password
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
        <Form>
          <Form.Group>
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  id="blocked"
                  placeholder="Insert User Name"
                  value={user}
                  onInput={(e) => setUser(e.target.value)}
                />
              </Col>
              <Col>
                <Button variant="danger" onClick={handleDeleteUser}>
                  Delete User
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
