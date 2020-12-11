"use strict";

var mongoose = require("mongoose"),
  Util = require("../util/api_utils"),
  BodyMaps = require("./bodyMaps"),
  ProsumerSettings = mongoose.model("ProsumerSettings");

exports.get_all_prosumer_settings = function (req, res) {
  ProsumerSettings.find({}, function (err, prosumers) {
    if (err) {
      res.send("sum ting wong");
    } else {
      var i = 0;
      for (i = 0; i < prosumers.length; i++) {
        if (prosumers[i] != null) {
          prosumers[i].login_credentials.password = "no you, mr hackerman"; // sophisticated password protection
        }
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(prosumers);
    }
  });
};

exports.get_prosumer_setting = function (req, res) {
  ProsumerSettings.findOne({ id: req.params.id }, function (err, prosumer) {
    if (err) {
      res.send("sum ting wong");
    } else {
      if (prosumer != null) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        prosumer.login_credentials.password = "no you, mr hackerman"; // sophisticated password protection
        res.json(prosumer);
      } else {
        res.statusCode = 404;
        res.send();
      }
    }
  });
};

exports.update_prosumer_settings_img_url = function (req, res) {
  var valid = Util.validBody(req, BodyMaps.img_urlMap());
  if (!valid) {
    res.statusCode = 400;
    res.send("You sent a bad request MOTHAFUCKA");
  } else {
    ProsumerSettings.findOneAndUpdate(
      { id: req.params.id },
      { $set: { img_url: req.body.img_url } },
      function (err, prosumer) {
        if (err) {
          res.statusCode = 418;
          res.send("sum ting wong when updating img url");
        } else {
          res.statusCode = 204;
          res.send();
        }
      }
    );
  }
};

exports.update_prosumer_settings_password = function (req, res) {
  /* --- for testing ---*/
  var valid = Util.validBody(req, BodyMaps.passwordMap());
  if (!valid) {
    res.statusCode = 400;
    res.send("BADU INPUTTUH");
    return;
  } else {
    ProsumerSettings.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          "login_credentials.password": req.body.login_credentials.password,
        },
      },
      function (err, prosumer) {
        if (err) {
          res.statusCode = 418;
          res.send("sum ting wong when updating password");
        } else {
          res.statusCode = 204;
          res.send();
        }
      }
    );
  }
  /* --- for testing ---*/
};

exports.update_prosumer_settings_distr_over = function (req, res) {
  console.log(req.body);
  var valid = Util.validBody(req, BodyMaps.distr_overMap());
  if (!valid) {
    res.statusCode = 400;
    res.send("You sent a bad request MOTHAFUCKA");
  } else {
    ProsumerSettings.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          "distribution.sell": req.body.distribution.sell,
          "distribution.store": req.body.distribution.store,
        },
      },
      function (err, prosumer) {
        if (err) {
          res.statusCode = 418;
          res.send("sum ting wong when updating distr over");
        } else {
          res.statusCode = 204;
          res.send();
        }
      }
    );
  }
};

exports.update_prosumer_settings_distr_under = function (req, res) {
  var valid = Util.validBody(req, BodyMaps.distr_underMap());
  if (!valid) {
    res.statusCode = 400;
    res.send("You sent a bad request MOTHAFUCKA");
  } else {
    ProsumerSettings.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          "distribution.buy": req.body.distribution.buy,
          "distribution.drain": req.body.distribution.drain,
        },
      },
      function (err, prosumer) {
        if (err) {
          res.statusCode = 418;
          res.send("sum ting wong when updating distr under");
        } else {
          res.statusCode = 204;
          res.send();
        }
      }
    );
  }
};

exports.update_prosumer_settings_battery_warning_threshold = function (
  req,
  res
) {
  var valid = Util.validBody(req, BodyMaps.battery_warning_thresholdMap());
  if (!valid) {
    res.statusCode = 400;
    res.send("You sent a bad request MOTHAFUCKA");
  } else {
    ProsumerSettings.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: { battery_warning_threshold: req.body.battery_warning_threshold },
      },
      function (err, prosumer) {
        if (err) {
          res.statusCode = 418;
          res.send("sum ting wong when updating battery warning threshold");
        } else {
          res.statusCode = 204;
          res.send();
        }
      }
    );
  }
};

exports.update_prosumer_settings_online = function (req, res) {
  var valid = Util.validBody(req, BodyMaps.onlineMap());
  if (!valid) {
    res.statusCode = 400;
    res.send("You sent a bad request MOTHAFUCKA");
  } else {
    ProsumerSettings.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: { "login_credentials.online": req.body.login_credentials.online },
      },
      function (err, prosumer) {
        if (err) {
          res.statusCode = 418;
          res.send("sum ting wong when updating online");
        } else {
          res.statusCode = 204;
          res.send();
        }
      }
    );
  }
};

<<<<<<< HEAD
exports.add_prosumer_setting = function (req,res) {
  var valid = Util.validBody(req, BodyMaps.completeProsumerMap()); // TODO: sometimes get "cannot read property 'sell', check it out"
  if(!valid){
=======
exports.add_prosumer_setting = function (req, res) {
  var valid = Util.validBody(req, BodyMaps.completeProsumerMap());
  if (!valid) {
>>>>>>> 6357e546e5fd3e0087a64cc4365cb394c20cf94b
    res.statusCode = 400;
    res.send("You sent a bad request MOTHAFUCKA");
  } else {
    //check that the Id doesnt already exist.
    ProsumerSettings.findOne({ id: req.body.id }, function (err, t) {
      if (t != null) {
        res.statusCode = 400;
        res.send("Prosumer already exists");
      } else {
        //insert new prosumer:
        ProsumerSettings.create(
          {
            id: req.body.id,
            img_url: req.body.img_url,
            distribution: {
              sell: req.body.distribution.sell,
              store: req.body.distribution.store,
              buy: req.body.distribution.buy,
              drain: req.body.distribution.drain,
            },
            battery_warning_threshold: req.body.battery_warning_threshold,
            login_credentials: {
              password: req.body.login_credentials.password,
              online: req.body.login_credentials.online,
            },
          },
          function (err, prosumer) {
            if (err) {
              res.statusCode = 418;
              res.send("sum ting wooong");
            } else {
              res.json("insertade skitN");
            }
          }
        );
      }
    });
  }
};

exports.add_prosumer_setting_test = function (req) {
    console.log("we made it here")
    //check that the Id doesnt already exist.
    ProsumerSettings.findOne({ id: req.id }, function (err, t) {
      if (t != null) {
        
        console.log("Prosumer already exists");
      } else {
        //insert new prosumer:
        ProsumerSettings.create(
          {
            id: req.id,
            img_url: "test-atm i add_prosumer_setting_test routen",
            distribution: {
              sell: 1337,
              store: 1337,
              buy: 1337,
              drain: 1337,
            },
            battery_warning_threshold: 1337,
            login_credentials: {
              password: "behöver vi spara password?<3",
              online: 0,
            },
          },
          function (err, prosumer) {
            if (err) {
              console.error(err)
            } else {
                console.log("print the new prosumer:")
                console.log(prosumer)
            }
          }
        );
        console.log(" and added a user");
      }
    });
  
};

exports.delete_prosumer_settings = function (req, res) {
  ProsumerSettings.deleteOne({ id: req.params.id }, function (err, prosumer) {
    if (err) {
      res.statusCode = 418;
      res.send("Could not find the settings for that prosumer");
    } else {
      res.statusCode = 200;
      res.send("The prosumer settings are now deleted");
    }
  });
};
