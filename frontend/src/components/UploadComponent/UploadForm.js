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
    //console.log(document.getElementById("exampleFormControlFile1").value);
    var formData = new FormData();
    var imagefile = document.querySelector("#exampleFormControlFile1");

    formData.append("image", imagefile.files[0]);
    console.log(imagefile.files[0]);
    let path = "";
    const usr = localStorage.getItem(CURRENTUSER);
    if (usr != "Manager") {
      path = "/prosumersettings/" + usr + "/img_url";
    } else {
      path = "/managersettings/img_url";
    }
    console.log(path);
    axios
      .post(API_BASE_URL + path, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        //uploadFile()
        //upload the image to the backend.
        //redirect to /home.
      })
      .catch(function (error) {
        console.log(error);
      });

    if (usr == "Manager") {
      props.history.push("/manager");
    } else {
      props.history.push("/home");
    }
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
