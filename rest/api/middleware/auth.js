const User = require("../models/user_model");

// Verifies the auth token of the user.
const auth = (req, res, next) => {
  let token = req.headers.authtoken;
  console.log(req)
  
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) {
        console.log(user)
        console.log(token)
        console.log("sending isauthFalse")
        
      return res.json({ isAuth: false, error: true });
    }
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
