import 'bootstrap/dist/css/bootstrap.css';


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import {ACCESS_TOKEN_NAME} from './constants/apiConstants'


axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem(ACCESS_TOKEN_NAME);
    console.log("using the interceptor and setting a auth token")
    
    config.headers.Authorization =  token;
    console.log(config)

    return config;
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
