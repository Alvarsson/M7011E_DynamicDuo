const { User } = require('../models/user_model');
const auth = (req, res, next) => {
    let token = req.cookies.authToken;

    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if (!user) return res.json({ isAuth: false, error: true})
        req.token = token;
        req.user = user;
        next();
    });
}

module.exports = { auth }
