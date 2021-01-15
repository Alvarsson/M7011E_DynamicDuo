const { verify } = require("jsonwebtoken");
const fs = require('fs');
const User = require("../models/user_model");



// Verifies the auth token of the user.
const auth = (req, res, next) => {
  let token = req.headers.token;
  let simToken = req.headers.sim;
  let cookieToken = req.cookies.authToken;

  if(simToken){
    cookieToken = simToken;
  }

  //console.log("TOKEN IS:", cookieToken)
  let userName = req.params.id;
  console.log("USERNAME: ", userName);

  //let usrid = req.originalUrl;
  //console.log("YOOOOOOO"+usrid)
  //const idCheck = ezParser(usrid);

  const verifyToken = fs.readFileSync("simkey.json");
  const parseToken = JSON.parse(verifyToken);
  const checkToken = parseToken.simKey;
  //console.log("USER ID IS: ", idCheck)
  let i = 1;
  User.findByToken(cookieToken, (err, user) => {
    
    if (err) throw err;

    if(user == "simulator" && cookieToken == checkToken) {
      req.token = cookieToken;
      req.user = user;
      next();
      return;
    } else if(!user) {
      console.log("HÄR BLIR DET FEL"+ user);
      return res.json({ isAuth: false, error: true });
    } else if(userName != user.id) {
      //console.log("USER ID"+user.id);
      //console.log("ID CHECK"+idCheck);
      return res.json({ isAuth: false, error: true });
    }
    
    //vad gör dessa? lägger till token på request?
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


