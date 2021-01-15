const { verify } = require("jsonwebtoken");
const fs = require('fs');
const User = require("../models/user_model");



// Verifies the auth token of the user.
const auth = (req, res, next) => {
  let token = req.headers.token;
  let simToken = req.headers.sim;
  //let cookieToken = req.cookies.authToken;
  let cookieToken = req.headers.authorization;

  if(simToken){
    cookieToken = simToken;
  }
  //console.log("REQ HEADERS", req.headers);

  let userName = req.params.id;
  console.log("USERNAME: ", userName);

  const verifyToken = fs.readFileSync("simkey.json");
  const parseToken = JSON.parse(verifyToken);
  const checkToken = parseToken.simKey;
  //console.log("USER ID IS: ", idCheck)
  let i = 1;
  User.findByToken(cookieToken, (err, user) => {
    
    if (err) throw err;
    console.log("COOKIETOKEN", cookieToken);
    console.log("AUTH THIS IS THE USER:", user);
    if(user == "simulator" && cookieToken == checkToken) {
      req.token = cookieToken;
      req.user = user;
      next();
      return;
    } else if(!user) {
      console.log("AUTH USER DOES NOT EXIST"+ user);
      return res.json({ isAuth: false, error: true });
    } else if(userName != user.id && 'Manager' != user.id) {
      console.log(userName);
      console.log("AUTH USERName IS NOT EQUAL TO EXPECTED ID", user.id);
      console.log("ID CHECK"+idCheck);
      return res.json({ isAuth: false, error: true });
    }
    
    //vad gör dessa? lägger till token på request?
    //console.log("AUTH PASSED, USER:", user);
    req.token = token;
    req.user = user;
    //console.log(user);
    next();
  });
  /* function ezParser(st) {
    var splitList = st.split("/")
    console.log("DALIST YOOOO"+splitList[3]);
    return splitList[3];
  } */
};



module.exports = { auth };


