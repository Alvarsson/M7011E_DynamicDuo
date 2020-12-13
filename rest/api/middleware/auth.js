const User = require("../models/user_model");

// Verifies the auth token of the user.
const auth = (req, res, next) => {
  let token = req.headers.token;
  let cookieToken = req.cookies.authToken;
  //console.log("TOKEN IS:", cookieToken)
  let usrid = req.originalUrl;
  const idCheck = ezParser(usrid);

  //console.log("USER ID IS: ", idCheck)
  
  User.findByToken(cookieToken, (err, user) => {
    if (err) throw err;
    if (!user) {
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


