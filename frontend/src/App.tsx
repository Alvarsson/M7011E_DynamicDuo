import React, { useEffect, useState } from "react";
import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import Home from './components/Home/Home';
import PrivateRoute from './utils/PrivateRoute';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import AlertComponent from './components/AlertComponent/AlertComponent';  

import ProsumerSettings from "./ProsumerSettings";

import ManagerMain from './components/Manager/ManagerMain'



const App: React.FC = () => {
    //adds the jwt to all outgoing request from the client
    
    
    const [title, updateTitle] = useState(null);
    const [errorMessage, updateErrorMessage] = useState(null);

    //SE TILL ATT MANAGER HAMNAR I PRIVATE ROUTE
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
              <Route path="/manager">
                <ManagerMain />
              </Route>
            </Switch>
            <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
          </div>
      </div>
      </Router>
    );
};


export default App;
