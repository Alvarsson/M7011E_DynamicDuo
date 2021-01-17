const { verify } = require("jsonwebtoken");
const fs = require('fs');
const User = require("../models/user_model");



// Verifies the auth token of the user.
const auth = (req, res, next) => {
  let token = req.headers.token;
  let simToken = req.headers.sim;
  let cookieToken = req.headers.authorization;

  if(simToken){
    cookieToken = simToken;
  }

  let userName = req.params.id;

  const verifyToken = fs.readFileSync("simkey.json");
  const parseToken = JSON.parse(verifyToken);
  const checkToken = parseToken.simKey;
  let i = 1;
  User.findByToken(cookieToken, (err, user) => {
    
    if (err) throw err;
    if(user == "simulator" && cookieToken == checkToken) {
      req.token = cookieToken;
      req.user = user;
      next();
      return;
    } else if(!user) {
      return res.json({ isAuth: false, error: true });
    } else if(userName != user.id && 'Manager' != user.id) {

      return res.json({ isAuth: false, error: true });
    }
    
    req.token = token;
    req.user = user;
    next();
  });

};



module.exports = { auth };


