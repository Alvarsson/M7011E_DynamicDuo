import React, { useState } from "react";
import axios from "axios";
import {
  API_BASE_URL,
  ACCESS_TOKEN_NAME,
  CURRENTUSER,
} from "../../constants/apiConstants";
import { withRouter } from "react-router-dom";

function LoginForm(props) {
  const [state, setState] = useState({
    id: "",
    password: "",
    successMessage: null,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    const payload = {
      id: state.userID,
      password: state.password,
    };
    axios
      .post(API_BASE_URL + "/login", payload, { withCredentials: true })
      .then(function (response) {
        if (response.status === 200) {
          setState((prevState) => ({
            ...prevState,
            successMessage: "Login successful. Redirecting to home page..",
          }));

          localStorage.setItem(ACCESS_TOKEN_NAME, response.data.userData.token);
          localStorage.setItem(CURRENTUSER, response.data.userData.id);
          if (response.data.userData.id == "Manager") {
            redirectToManager();
          } else {
            redirectToHome();
          }
          props.showError(null);
        } else if (response.code === 204) {
          props.showError("Username and password do not match");
        } else {
          props.showError("Username does not exists");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const redirectToManager = () => {
    props.updateTitle("Manager");
    props.history.push("/manager");
  };
  const redirectToHome = () => {
    props.updateTitle("Home");
    props.history.push("/home");
  };
  const redirectToRegister = () => {
    props.history.push("/register");
    props.updateTitle("Register");
  };
  return (
    <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
      <form>
        <div className="form-group text-left">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="text"
            className="form-control"
            id="userID"
            placeholder="Enter id"
            value={state.userID}
            onChange={handleChange}
          />
        </div>
        <div className="form-group text-left">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-check"></div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmitClick}
        >
          Submit
        </button>
      </form>
      <div
        className="alert alert-success mt-2"
        style={{ display: state.successMessage ? "block" : "none" }}
        role="alert"
      >
        {state.successMessage}
      </div>
      <div className="registerMessage">
        <span>Dont have an account? </span>
        <span className="loginText" onClick={() => redirectToRegister()}>
          Register
        </span>
      </div>
    </div>
  );
}

export default withRouter(LoginForm);
