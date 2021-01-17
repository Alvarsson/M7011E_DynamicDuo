"use strict";

var mongoose = require("mongoose"),
  User = mongoose.model("User");
var prosumerController = require("./prosumerController");

exports.RegisterUser = function (req, res) {
  const user = new User(req.body);
  console.log(req.body);
  if (req.body.id == null || req.body.password == null) {
    res.statusCode = 404;
    res.send("Need a user ID and Password.");
  } else {
    User.findOne({ id: req.body.id }, function (err, usr) {
      if (usr) {
        return res.status(400).json("Id already claimed.");
      } else {
        user.save((err, dock) => {
          if (err) {
            return res.status(422).json({ errors: err });
          } else {
            const userData = {
              id: dock.id,
            };

            return res.status(200).json({
              success: true,
              message: "Successfully Signed Up",
              userData,
            });
          }
        });
      }
    });
  }
};

exports.LoginUser = (req, res) => {
  User.findOne({ id: req.body.id }, (err, user) => {
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User id not found.",
      });
    } else {
      user.comparePassword(req.body.password, (err, isMatch) => {
        //isMatch is either true or false
        if (!isMatch) {
          return res.status(400).json({
            success: false,
            message: "Wrong Password.",
          });
        } else {
          user.generateToken((err, user) => {
            if (err) {
              return res.status(400).send({ err });
            } else {
              console.log(
                "the token we generated and added to the backend is:" +
                  user.token
              );
              console.log("INSIDE LOGIN" + user.id);
              const data = {
                userID: user._id,
                id: user.id,
                token: user.token,
              };
              // saves token to cookie
              //res.setHeader('token', user.token)
              //res.setHeader('usrID', user.id)
              res.cookie("authToken", user.token);
              res.cookie("ID", user.id);
              res.status(200).json({
                success: true,
                message: "Successfully Logged in!",
                userData: data,
              });
            }
          });
        }
      });
    }
  });
};

exports.LogoutUser = (req, res) => {
  User.findByIdAndUpdate({ _id: req.user._id }, { token: "" }, (err) => {
    if (err)
      return res.json({
        success: false,
        err,
      });

    return res.status(200).send({
      success: true,
      message: "Successfully logged out.",
    });
  });
};

//get authenticated user details, used in testing mostly
exports.getUserDetails = (req, res) => {
  return res.status(200).json({
    isAuthenticated: true,
    id: req.user.id,
  });
};

exports.DeleteUser = (req, res) => {
  console.log("REQ PARAMS:", req.params.id);
  User.deleteOne({ id: req.params.id }, (err) => {
    if (err)
      return res.json({
        success: false,
        err,
      });
    console.log("THIS SHOULD DELETE SOME STUFF");
    return res.status(200).send({
      success: true,
      message: "Successfully deleted user.",
    });
  });
};
