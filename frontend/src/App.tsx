import React, { useEffect, useState } from "react";
import './App.css';
import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import Home from './components/Home/Home';
import PrivateRoute from './utils/PrivateRoute';
import {ACCESS_TOKEN_NAME} from './constants/apiConstants'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import AlertComponent from './components/AlertComponent/AlertComponent';  

import ProsumerSettings from "./ProsumerSettings";

import axios from 'axios';


const App: React.FC = () => {
    //adds the jwt to all outgoing request from the client
    axios.interceptors.request.use(function (config) {
        const token = localStorage.getItem(ACCESS_TOKEN_NAME);
        console.log("using the interceptor and setting a auth token")

        
        config.headers.Authorization =  token;
        console.log(config)
    
        return config;
    });
    
    const [title, updateTitle] = useState(null);
    const [errorMessage, updateErrorMessage] = useState(null);
    return (
      <Router>
      <div className="App">
        <Header title={title}/>
          <div className="container d-flex align-items-center flex-column">
            <Switch>
              <Route path="/" exact={true}>
                <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
              </Route>
              <Route path="/register">
                <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
              </Route>
              <Route path="/login">
                <LoginForm showError={updateErrorMessage} updateTitle={updateTitle}/>
              </Route>
              <PrivateRoute path="/home">
                <ProsumerSettings />
              </PrivateRoute>
            </Switch>
            <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
          </div>
      </div>
      </Router>
    );
};


export default App;
