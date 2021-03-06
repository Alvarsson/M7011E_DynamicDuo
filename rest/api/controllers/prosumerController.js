"use strict";

var mongoose = require("mongoose"),
  User = mongoose.model("User"),
  Util = require("../util/api_utils"),
  BodyMaps = require("./bodyMaps"),
  upload = require("../upload_pic"),
  path = require("path"),
  ProsumerSettings = mongoose.model("ProsumerSettings");

exports.get_all_prosumer_settings = function (req, res) {
  ProsumerSettings.find({}, function (err, prosumers) {
    if (err) {
      res.send("Something went wrong getting all settings");
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
      res.send("Something went wrong getting the settings");
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
  const fileName = req.params.id + path.extname(req.files.image.name);
  upload.uploadFile(fileName, req.files.image.data, (img_url) => {
    ProsumerSettings.findOneAndUpdate(
      { id: req.params.id },
      { $set: { img_url: img_url } },
      function (err, prosumer) {
        if (err) {
          res.statusCode = 418;
          res.send("Error when updating img url");
        } else {
          res.statusCode = 204;
          res.send();
        }
      }
    );
  });
};

exports.update_prosumer_settings_password = function (req, res) {
  /* --- for testing ---*/
  var valid = Util.validBody(req, BodyMaps.passwordMap());
  if (!valid) {
    res.statusCode = 400;
    res.send("BAD INPUT");
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
          res.send("Error when updating password");
        } else {
          User.findOne({ id: req.params.id }, function (err, user) {
            user.password = req.body.login_credentials.password;
            user.save((err, dock) => {
              if (err) {
                return res.status(422).json({ errors: err });
              } else {
                res.statusCode = 204;
                res.send();
              }
            });
          });
        }
      }
    );
  }
  /* --- for testing ---*/
};

exports.update_prosumer_settings_distr_over = function (req, res) {
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
    res.send("You sent a bad request.");
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
          res.send("Error updating distr under");
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
    res.send("You sent a bad request.");
  } else {
    ProsumerSettings.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: { battery_warning_threshold: req.body.battery_warning_threshold },
      },
      function (err, prosumer) {
        if (err) {
          res.statusCode = 418;
          res.send("Error when updating battery warning threshold.");
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
    res.send("You sent a bad request.");
  } else {
    ProsumerSettings.findOneAndUpdate(
      { id: req.params.id },
      {
        $inc: { "login_credentials.online": req.body.login_credentials.online },
      },
      function (err, prosumer) {
        if (err) {
          res.statusCode = 418;
          res.send("Error when updating online");
        } else {
          res.statusCode = 204;
          res.send();
        }
      }
    );
  }
};

exports.update_prosumer_settings_blocked = function (req, res) {
  var valid = Util.validBody(req, BodyMaps.blockedMap());
  if (!valid) {
    res.statusCode = 400;
    res.send("You sent a bad request.");
  } else {
    ProsumerSettings.findOneAndUpdate(
      { id: req.params.id },
      { $set: { blocked: req.body.blocked } },
      function (err, prosumer) {
        if (err) {
          res.statusCode = 418;
          res.send("Error when updating blocked");
        } else {
          res.statusCode = 204;
          res.send();
        }
      }
    );
  }
};

exports.update_prosumer_settings_broken = function (req, res) {
  var valid = Util.validBody(req, BodyMaps.brokenMap());
  if (!valid) {
    res.statusCode = 400;
    res.send("You sent a bad request.");
  } else {
    ProsumerSettings.findOneAndUpdate(
      { id: req.params.id },
      { $set: { broken: req.body.broken } },
      function (err, prosumer) {
        if (err) {
          res.statusCode = 418;
          res.send("Error when updating broken");
        } else {
          res.statusCode = 204;
          res.send();
        }
      }
    );
  }
};

exports.update_prosumer_settings_blackout = function (req, res) {
  var valid = Util.validBody(req, BodyMaps.blackoutMap());
  if (!valid) {
    res.statusCode = 400;
    res.send("You sent a bad request.");
  } else {
    ProsumerSettings.findOneAndUpdate(
      { id: req.params.id },
      { $set: { blackout: req.body.blackout } },
      function (err, prosumer) {
        if (err) {
          res.statusCode = 418;
          res.send("Error when updating blackout");
        } else {
          res.statusCode = 204;
          res.send();
        }
      }
    );
  }
};

exports.add_prosumer_setting = function (req, res) {
  var valid = Util.validBody(req, BodyMaps.completeProsumerMap()); // TODO: sometimes get "cannot read property 'sell', check"
  if (!valid) {
    res.statusCode = 400;
    res.send("You sent a bad request.");
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
            blocked: req.body.blocked,
            broken: req.body.broken,
            blackout: req.body.blackout,
            battery_warning_threshold: req.body.battery_warning_threshold,
            login_credentials: {
              password: req.body.login_credentials.password,
              online: req.body.login_credentials.online,
            },
          },
          function (err, prosumer) {
            if (err) {
              res.statusCode = 418;
              res.send("Something went wrong.");
            } else {
              res.json("Inserted prosumer data.");
            }
          }
        );
      }
    });
  }
};

exports.delete_prosumer_settings = function (req, res) {
  ProsumerSettings.deleteOne({ id: req.params.id }, function (err, prosumer) {
    if (err) {
      res.statusCode = 418;
      res.send("Could not find the settings for that prosumer.");
    } else {
      res.statusCode = 200;
      res.send("The prosumer settings are now deleted.");
    }
  });
};
