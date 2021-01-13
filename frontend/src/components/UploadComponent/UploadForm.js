import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/esm/Row";
import axios from "axios";

//import uploadFile from "../../../../rest/api/upload_pic";
import {
  API_BASE_URL,
  ACCESS_TOKEN_NAME,
  CURRENTUSER,
} from "../../constants/apiConstants";
import { withRouter } from "react-router-dom";

function UploadForm(props) {
  const handleSubmitClick = (e) => {
    e.preventDefault();
    console.log(document.getElementById("exampleFormControlFile1").value);
    
    // axios
    //   .post(API_BASE_URL + "/api/prosumersettings/:id/img_url", {
    //     withCredentials: true,
    //   })
    //   .then(function (response) {
    //     //uploadFile()
    //     //upload the image to the backend.
    //     //redirect to /home.
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };

  return (
    <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
      
      <Form>
        <Form.Group>
          <Form.File id="exampleFormControlFile1" label="Example file input" />
          <Button onClick={handleSubmitClick}>Upload</Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default withRouter(UploadForm);
