'use strict';

var mongoose = require('mongoose'),
Util = require('../util/api_utils'),
BodyMaps = require('./bodyMaps'),
upload = require("../upload_pic"),
path = require('path'),
ManagerSettings = mongoose.model('ManagerSettings');

//  Always get the manager from the only id existing once created.
exports.get_manager_setting = function(req, res) {
    var isManager = Util.isManager(req);
    if(!isManager) {
        res.statusCode = 404;
        res.send("Must be logged in as Manager.");
    }
    ManagerSettings.findOne({id: "Manager"}, function(err, manager) {
        if(err) {
            res.send("roh row, shaggy");
        } else {
            if(manager != null) {
                console.log(manager)
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

// We don't really need to update via id so should just send update directly.
exports.update_manager_setting_img_url = function(req, res) {
    /* var isManager = Util.isManager(req);
    var valid = Util.validBody(req, BodyMaps.img_urlMap());
    if(!valid || !isManager) {
        res.statusCode = 400;
        res.send('Bad request, veri bad');
    } else { */
        const fileName = "Manager" + path.extname(req.files.image.name);
        upload.uploadFile(fileName, req.files.image.data, (img_url) => {
            ManagerSettings.findOneAndUpdate({id: "Manager"}, {$set: {img_url:req.body.img_url}}, function(err, manager) {
                if(err) {
                    res.statusCode = 418;
                    res.send("roh row, shaggy, cant update dat");
                }
                console.log("update complete, over and out")
                res.statusCode = 204;
                res.send();
            });
        });
        
    //}
    
}

exports.update_manager_setting_password = function(req, res){
    var isManager = Util.isManager(req);
    var valid = Util.validBody(req, BodyMaps.passwordMap());
    if(!valid || !isManager) {
        res.statusCode = 400;
        res.send("Bad request for dat sweet password");
    } else {
        ManagerSettings.findOneAndUpdate({id: "Manager"},
        {$set:{"login_credentials.password": req.body.login_credentials.password}},
        function(err, manager) {
            if (err) {
                res.statusCode = 418;
                res.send("couldn't update that password for ya");
            } else {
                res.statusCode = 204;
                res.send();
            }
        });
    }
    
}

exports.update_manager_settings_battery_warning_threshold = function(req,res) {
    var isManager = Util.isManager(req);
    var valid = Util.validBody(req, BodyMaps.battery_warning_thresholdMap());
    if(!valid || !isManager) {
        res.statusCode = 400;
        res.send("Das is eine bad request jaah");
    } else {
        ManagerSettings.findOneAndUpdate({id: "Manager"},
        {$set:{battery_warning_threshold: req.body.battery_warning_threshold}},
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


exports.update_manager_settings_distribution = function (req, res) {
    var isManager = Util.isManager(req);
    var valid = Util.validBody(req, BodyMaps.distr_overMap());
    if (!valid || !isManager) {
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
            res.send("sum ting wong when updating manager distribution");
          } else {
            res.statusCode = 204;
            res.send();
          }
        }
      );
    }
  };

exports.update_manager_settings_online = function(req,res) {
    var isManager = Util.isManager(req);
    var valid = Util.validBody(req, BodyMaps.onlineMap());
    if(!valid || !isManager) {
        res.statusCode = 400;
        res.send("Das is eine bad request jaah");
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
    var valid = Util.validBody(req,BodyMaps.completeManagerMap());
    if(!valid) {
        res.statusCode = 400;
        res.send("Das is eine bad request jaah");
    } else {
        ManagerSettings.findOne({id: "Manager"}, function(err, manager) {
            if(manager){
                res.statusCode = 400;
                res.send("vewy bad wequest");
            } else {
                // insert the manager
                ManagerSettings.create({id: "Manager",
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
                        res.send("Dis not good, create no goodie");
                    } else {
                        res.json("theMan is created");
                    }
                });
            }
        });

        
    }
}

exports.delete_manager_settings = function(req, res) {
    var isManager = Util.isManager(req);
    if(!isManager) {
        res.statusCode = 404;
        res.send("Must be logged in as Manager.");
    }
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