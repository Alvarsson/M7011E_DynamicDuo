import React, { useState } from "react";
import axios from "axios";
//import uploadFile from "../../../../rest/api/upload_pic";
import {
  API_BASE_URL,
  ACCESS_TOKEN_NAME,
  CURRENTUSER,
} from "../../constants/apiConstants";
import { withRouter } from "react-router-dom";

function Form(props) {
  
  const handleSubmitClick = (e) => {
    e.preventDefault();
    console.log(e);
    axios
      .post(API_BASE_URL + "/api/prosumersettings/:id/img_url", { withCredentials: true })
      .then(function (response) {
        //uploadFile()
        //upload the image to the backend.
        //redirect to /home.
       
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  
  return (
    <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
      <form>
        <input type="file" name="file" />
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmitClick}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default withRouter(Form);
