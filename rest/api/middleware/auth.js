const { verify } = require("jsonwebtoken");
const fs = require('fs');
const User = require("../models/user_model");



// Verifies the auth token of the user.
const auth = (req, res, next) => {
  let token = req.headers.token;
  let simToken = req.headers.sim;
  let cookieToken = req.cookies.authToken;
  //console.log("TOKEN IS:", cookieToken)
  let usrid = req.originalUrl;
  const idCheck = ezParser(usrid);

  const verifyToken = fs.readFileSync("../../../simulator/src/simkey.json");
  const parseToken = JSON.parse(verifyToken);
  const checkToken = parseToken.simKey;

  //console.log("USER ID IS: ", idCheck)
  
  User.findByToken(cookieToken, (err, user) => {
    if (err) throw err;

    if(!user && simToken == checkToken) {
      req.token = simToken;
      req.user = "simulator";
      next();
    }
    else if(!user) {
      return res.json({ isAuth: false, error: true });
    }
    else if(user.id != idCheck) {
      return res.json({ isAuth: false, error: true });
    }
    
    //vad gör dessa? lägger till token på request?
    req.token = token;
    req.user = user;
    //console.log(user);
    next();
  });
  function ezParser(st) {
    var splitList = st.split("/")
    return splitList[2];
  }
};



module.exports = { auth };


