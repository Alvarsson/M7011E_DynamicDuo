import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import {
  ACCESS_TOKEN_NAME,
  API_BASE_URL,
  CURRENTUSER,
} from "../../constants/apiConstants";

function Header(props) {
  const capitalize = (s) => {
    //capitalize the title in the blue header. Based on the url. /home -> Home. /manager -> Manager
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  let title = capitalize(
    props.location.pathname.substring(1, props.location.pathname.length)
  );
  if (props.location.pathname === "/") {
    title = "Welcome";
  }

  function renderChangePicture() {
    if (
      props.location.pathname === "/home" ||
      props.location.pathname === "/manager"
    ) {
      return (
        // back to info kanske? istället för picture in pjcture?
        <div className="ml-auto">
          <button
            className="btn btn-secondary"
            onClick={() => handleChangePicture()}
          >
            Change Picture
          </button>
        </div>
      );
    } else if (props.location.pathname === "/picture") {
      return (
        // back to info kanske? istället för picture in pjcture?
        <div className="ml-auto">
          <button
            className="btn btn-secondary"
            onClick={() => props.history.push("/home")}
          >
            Back
          </button>
        </div>
      );
    }
  }
  function handleChangePicture() {
    //localStorage.removeItem(ACCESS_TOKEN_NAME)
    props.history.push("/picture");
  }

  function renderLogout() {
    if (
      props.location.pathname === "/home" ||
      props.location.pathname === "/manager" ||
      props.location.pathname === "/picture"
    ) {
      return (
        <div className="ml-auto">
          <button className="btn btn-danger" onClick={() => handleLogout()}>
            Logout
          </button>
        </div>
      );
    }
  }
  function handleLogout() {
    axios
      .get(API_BASE_URL + "/logout", {
        withCredentials: true,
      })
      .then(() => {
        axios
          .put(
            API_BASE_URL +
              "/prosumersettings/" +
              localStorage.getItem(CURRENTUSER) +
              "/online",
            {
              login_credentials: {
                online: -1,
              },
            },
            { withCredentials: true }
          )
          .then(function (response) {
            console.log("logout in user");
            localStorage.removeItem(ACCESS_TOKEN_NAME);
            localStorage.removeItem(CURRENTUSER);
          })
          .catch(function (error) {
            console.log(error);
          });
        console.log("logged out");
      });

    props.history.push("/login");
  }
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="row col-12 d-flex justify-content-center text-white">
        <span className="h3">{props.title || title}</span>
        {renderChangePicture()}
        {renderLogout()}
      </div>
    </nav>
  );
}
export default withRouter(Header);
