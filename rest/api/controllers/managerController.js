'use strict';

var mongoose = require('mongoose'),
ManagerSettings = mongoose.model('ManagerSettings');

//  Always get the manager from the only id existing once created.
exports.get_manager_setting = function(req, res) {
    ManagerSettings.findOne({id: "Manager"}, function(err, manager) {
        if(err) {
            res.send("roh row, shaggy");
        } else {
            console.log(manager)
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            manager.login_credentials.password = "PaSSwoRd ProTEctIOr 90o0";
            res.json(manager);
        }
    });
}

// We don't really need to update via id so should just send update directly.
exports.update_manager_setting_img_url = function(req, res) {
    console.log(req.params.id);
    ManagerSettings.findOneAndUpdate({id: "Manager"}, {$set: {img_url:req.body.img_url}}, function(err, manager) {
        if(err) {
            res.send("roh row, shaggy, cant update dat");
        }
        console.log("update complete, over and out")
        res.statusCode = 204;
    });
}

exports.update_manager_setting_password = function(req, res){
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

exports.update_manager_settings_battery_warning_threshold = function(req,res) {
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

exports.update_manager_settings_online = function(req,res) {
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

exports.add_manager_setting = function (req, res) {
    try {
        // Since we only create one manager we don't need to chech this.
        /* if(req.body.id == undefined){
            throw "Manager ID undefined";
        } */
        if(req.body.img_url == undefined){
            throw "Manager img_url undefined";
        }
        if(req.body.battery_warning_threshold == undefined){
            throw "Manager battery_warning_threshold undefined";
        }
        if(req.body.login_credentials == undefined
            || req.body.login_credentials.password == undefined
            || req.body.login_credentials.online == undefined){
            throw "Manager login_credentials undefined";
        }
        // check that the Manager doesn't already exist.
        ManagerSettings.findOne({id: "Manager"}, function(err, manager) {
            if(manager){
                throw " The Manager is already registered."
            }
        });

        // insert the manager
        ManagerSettings.create({id: "Manager",
            img_url: req.body.img_url,
            battery_warning_threshold: req.body.battery_warning_threshold,
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
    } catch (e){
        console.log(e);
        res.statusCode = 418;
        res.send("Something wong, no try is good enough: " + e)
    }
}

exports.delete_manager_settings = function(req, res) {
    ManagerSettings.deleteOne({id: "Manager"}, function(err, manager){
        if (err) {
            res.statusCode = 418;
            res.send("Could not find the manager settings");
        } else {
            res.statusCode = 200;
            res.send("The manager settings are now gone, gooooonee i tell yee");
        }
    });
}