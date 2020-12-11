const User = require("../models/user_model");

// Verifies the auth token of the user.
const auth = (req, res, next) => {
  let token = req.headers.authorization;
  
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) {

      return res.json({ isAuth: false, error: true });
    }
    //vad gör dessa? lägger till token på request?
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
