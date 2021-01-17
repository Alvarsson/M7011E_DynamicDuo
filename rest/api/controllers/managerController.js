'use strict';

var mongoose = require('mongoose'),
Util = require('../util/api_utils'),
BodyMaps = require('./bodyMaps'),
upload = require("../upload_pic"),
path = require('path'),
ManagerSettings = mongoose.model('ManagerSettings');

//  Always get the manager from the only id existing once created.
exports.get_manager_setting = function(req, res) {
    ManagerSettings.findOne({id: "Manager"}, function(err, manager) {
        if(err) {
            res.send("roh row, shaggy");
        } else {
            if(manager != null) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                manager.login_credentials.password = "PaSSwoRd ProTEctIOr 90o0";
                res.json(manager);
            } else {
                res.statusCode = 404;
                res.send("Could not find the manager settings.");
            }
            
        }
    });
}

exports.get_market_price = function(req, res) {
    ManagerSettings.findOne({id: "Manager"}, 'market_price', function(err, market_price) {
        if(err) {
            res.send("roh row, shaggy");
        } else {
            if(market_price != null) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(market_price);
            } else {
                res.statusCode = 404;
                res.send("Could not find the market price.");
            } 
        }
    });
}

exports.update_market_price = function(req,res) {
    var valid = Util.validBody(req, BodyMaps.market_priceMap());
    if(!valid) {
        res.statusCode = 400;
        res.send("Das is eine bad request jaah");
    } else {
        ManagerSettings.findOneAndUpdate({id: "Manager"},
        {$set:{market_price: req.body.market_price}},
        function(err, manager) {
            if (err) {
                res.statusCode = 418;
                res.send("Couldn't update that battery thingy for u gurl.");
            } else {
                res.statusCode = 204;
                res.send();
            }
        });
    }   
}


exports.update_PP_status = function(req,res) {
    var valid = Util.validBody(req, BodyMaps.PP_statusMap());
    if(!valid) {
        res.statusCode = 400;
        res.send("Das is eine bad request jaah");
    } else {
        ManagerSettings.findOneAndUpdate({id: "Manager"},
        {$set:{PP_status: req.body.PP_status}},
        function(err, manager) {
            if (err) {
                res.statusCode = 418;
                res.send("Couldn't update that battery thingy for u gurl.");
            } else {
                res.statusCode = 204;
                res.send();
            }
        });
    }   
}


exports.update_production = function(req,res) {
    var valid = Util.validBody(req, BodyMaps.productionMap());
    if(!valid) {
        res.statusCode = 400;
        res.send("Das is eine bad request jaah");
    } else {
        ManagerSettings.findOneAndUpdate({id: "Manager"},
        {$set:{production: req.body.production}},
        function(err, manager) {
            if (err) {
                res.statusCode = 418;
                res.send("Couldn't update that battery thingy for u gurl.");
            } else {
                res.statusCode = 204;
                res.send();
            }
        });
    }   
}

exports.update_inc_status_change = function (req, res) {
    var valid = Util.validBody(req, BodyMaps.inc_status_changeMap());
    if (!valid) {
      res.statusCode = 400;
      res.send("You sent a bad request MOTHAFUCKA");
    } else {
      ManagerSettings.findOneAndUpdate(
        { id: "Manager" },
        {
          $set: {
            "inc_status_change.timer": req.body.inc_status_change.timer,
            "inc_status_change.new_status": req.body.inc_status_change.new_status,
          },
        },
        function (err, x) {
          if (err) {
            res.statusCode = 418;
            res.send("sum ting wong when updating manager distribution");
          } else {
            res.statusCode = 204;
            res.send();
          }
        }
      );
    }
  };

  exports.update_inc_prod_change = function (req, res) {
    var valid = Util.validBody(req, BodyMaps.inc_prod_changeMap());
    if (!valid) {
      res.statusCode = 400;
      res.send("You sent a bad request MOTHAFUCKA");
    } else {
      ManagerSettings.findOneAndUpdate(
        { id: "Manager" },
        {
          $set: {
            "inc_prod_change.timer": req.body.inc_prod_change.timer,
            "inc_prod_change.new_prod": req.body.inc_prod_change.new_prod,
          },
        },
        function (err, x) {
          if (err) {
            res.statusCode = 418;
            res.send("sum ting wong when updating manager distribution");
          } else {
            res.statusCode = 204;
            res.send();
          }
        }
      );
    }
  };



// We don't really need to update via id so should just send update directly.
exports.update_manager_setting_img_url = function(req, res) {
    
        const fileName = "Manager" + path.extname(req.files.image.name);
        upload.uploadFile(fileName, req.files.image.data, (img_url) => {
            ManagerSettings.findOneAndUpdate({id: "Manager"}, {$set: {img_url: img_url}}, function(err, manager) {
                if(err) {
                    res.statusCode = 418;
                    res.send("Error updating image.");
                }
                console.log("Update complete.")
                res.statusCode = 204;
                res.send();
            });
        });
        
    //}
    
}

exports.update_manager_setting_password = function(req, res){
    var valid = Util.validBody(req, BodyMaps.passwordMap());
    if(!valid) {
        res.statusCode = 400;
        res.send("Bad request for password update.");
    } else {
        ManagerSettings.findOneAndUpdate({id: "Manager"},
        {$set:{"login_credentials.password": req.body.login_credentials.password}},
        function(err, manager) {
            if (err) {
                res.statusCode = 418;
                res.send("Couldn't update that password.");
            } else {
                res.statusCode = 204;
                res.send();
            }
        });
    }
    
}

exports.update_manager_settings_battery_warning_threshold = function(req,res) {
    var valid = Util.validBody(req, BodyMaps.battery_warning_thresholdMap());
    if(!valid) {
        res.statusCode = 400;
        res.send("Bad request.");
    } else {
        ManagerSettings.findOneAndUpdate({id: "Manager"},
        {$set:{battery_warning_threshold: req.body.battery_warning_threshold}},
        function(err, manager) {
            if (err) {
                res.statusCode = 418;
                res.send("Couldn't update the battery warning threshold.");
            } else {
                res.statusCode = 204;
                res.send();
            }
        });
    }   
}


exports.update_manager_settings_distribution = function (req, res) {
    var valid = Util.validBody(req, BodyMaps.distr_overMap());
    if (!valid) {
      res.statusCode = 400;
      res.send("You sent a bad request.");
    } else {
        ManagerSettings.findOneAndUpdate(
        { id: "Manager" },
        {
          $set: {
            "distribution.sell": req.body.distribution.sell,
            "distribution.store": req.body.distribution.store,
          },
        },
        function (err, prosumer) {
          if (err) {
            res.statusCode = 418;
            res.send("Error when updating manager distribution.");
          } else {
            res.statusCode = 204;
            res.send();
          }
        }
      );
    }
  };

exports.update_manager_settings_online = function(req,res) {
    var valid = Util.validBody(req, BodyMaps.onlineMap());
    if(!valid) {
        res.statusCode = 400;
        res.send("Bad request");
    } else {
        ManagerSettings.findOneAndUpdate({id: "Manager"},
        {$set:{"login_credentials.online": req.body.login_credentials.online}},
        function(err, manager){
            if(err) {
                res.statusCode = 418;
                res.send("Oh...even we dont know how many are online...");
            } else {
                res.statusCode = 204;
                res.send();
            }
        });
    } 
}

exports.add_manager_setting = function (req, res) {
    console.log("MANAGER SETTING CONTROLLER START");
    var valid = Util.validBody(req,BodyMaps.completeManagerMap());
    if(!valid) {
        res.statusCode = 400;
        res.send("Bad request.");
    } else {
        ManagerSettings.findOne({id: "Manager"}, function(err, manager) {
            if(manager){
                res.statusCode = 400;
                res.send("Bad request");
            } else {
                console.log("WE REACH THE DATA CREATE");
                // insert the manager
                ManagerSettings.create({id: "Manager",
                market_price: req.body.market_price,
                production: req.body.production,
                PP_status: req.body.PP_status,
                inc_status_change: {
                    timer: req.body.inc_status_change.timer,
                    new_status: req.body.inc_status_change.new_status
                },
                inc_prod_change: {
                    timer: req.body.inc_prod_change.timer,
                    new_prod: req.body.inc_prod_change.new_prod
                },
                img_url: req.body.img_url,
                battery_warning_threshold: req.body.battery_warning_threshold,
                distribution: {
                    store: req.body.distribution.store,
                    sell: req.body.distribution.sell
                },
                login_credentials: {
                    password: req.body.login_credentials.password,
                    online: req.body.login_credentials.online
                }},
                function(err, manager){
                    if (err) {
                        res.statusCode = 418;
                        res.send("Could not  create manager settings.");
                    } else {
                        res.json("Manager is created.");
                    }
                });
            }
        });

        
    }
}

exports.delete_manager_settings = function(req, res) {
    ManagerSettings.deleteOne({id: "Manager"}, function(err, manager){
        if (err) {
            res.statusCode = 418;
            res.send("Could not find the manager settings");
        } else {
            res.statusCode = 200;
            res.send("The manager settings are now deleted.");
        }
    });
}