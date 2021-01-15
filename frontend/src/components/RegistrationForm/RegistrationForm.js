import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from "../../constants/apiConstants";
import { withRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";

function RegistrationForm(props) {
  const [state, setState] = useState({
    //        confirmPassword: "",
    id: "",
    password: "",
    successMessage: null,
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      id: value,
    }));
  };
  const sendDetailsToServer = () => {
    if (state.id.length && state.password.length) {
      props.showError(null);
      const url = API_BASE_URL + "/register";
      console.log(url);
      const payload = {
        id: state.id,
        password: state.password,
      };

      const prosumerBody = {
        id: state.id,
        img_url: "http://www.placecage.com/200/200",
        distribution: {
          sell: 0.2,
          store: 0.8,
          buy: 0.4,
          drain: 0.6,
        },
        blocked: 0,
        broken: 0,
        blackout: false,
        battery_warning_threshold: 50,
        login_credentials: {
          password: state.password,
          online: 0,
        },
      };
      console.log(prosumerBody);

      axios
        .post(API_BASE_URL + "/register", payload)
        .then(function (responseA) {
          axios
            .post(API_BASE_URL + "/prosumersettings", prosumerBody)
            .then(function (response) {
              console.log(responseA);
              if (response.status === 200) {
                setState((prevState) => ({
                  ...prevState,
                  successMessage:
                    "Registration successful. Redirecting to home page..",
                }));
                localStorage.setItem(ACCESS_TOKEN_NAME, responseA.data.token);
                redirectToLogin();
                props.showError(null);
              } else {
                props.showError("Some error ocurred");
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log(error);
        });
      console.log(state);
    } else {
      props.showError("Please enter valid username and password");
    }
  };
  const redirectToHome = () => {
    props.updateTitle("Home");
    props.history.push("/home");
  };
  const redirectToLogin = () => {
    props.updateTitle("Login");
    props.history.push("/login");
  };
  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (state.password === state.confirmPassword) {
      sendDetailsToServer();
    } else {
      props.showError("Passwords do not match");
    }
  };
  return (
    <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
      <form>
        <div className="form-group text-left">
          <label htmlFor="exampleInputEmail1">user id</label>
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
        <div className="form-group text-left">
          <label htmlFor="exampleInputPassword1">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={state.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmitClick}
        >
          Register
        </button>
      </form>
      <div
        className="alert alert-success mt-2"
        style={{ display: state.successMessage ? "block" : "none" }}
        role="alert"
      >
        {state.successMessage}
      </div>
      <div className="mt-2">
        <span>Already have an account? </span>
        <Button className="loginText" onClick={() => redirectToLogin()}>
          Login here
        </Button>
      </div>
    </div>
  );
}

export default withRouter(RegistrationForm);
