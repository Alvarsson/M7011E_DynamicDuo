'use strict';

var mongoose = require('mongoose'),
ManagerSettings = mongoose.model('ManagerSettings');

//  Always get the manager from the only id existing once created.
exports.get_manager_setting = function(req, res) {
    ManagerSettings.findOne({id: "theMan"}, function(err, manager) {
        if(err) {
            res.send("roh row, shaggy");
        } else {
            console.log(manager)
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            manager.login_credentials.password = "u stop now ok";
            res.json(manager);
        }
    });
}

// We don't really need to update via id so should just send update directly.
exports.update_manager_setting_img_url = function(req, res) {
    console.log(req.params.id);
    ManagerSettings.findOneAndUpdate({id: "theMan"}, {$set: {img_url:req.body.img_url}}, function(err, manager) {
        if(err) {
            res.send("roh row, shaggy, cant update dat");
        }
        console.log("update complete, over and out")
        res.statusCode = 204;
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
        ManagerSettings.findOne({id: "theMan"}, function(err, manager) {
            if(manager){
                throw " The Manager is already registered."
            }
        });
        // insert the manager
        ManagerSettings.create({id: "theMan",
            img_url: req.body.img_url,
            battery_warning_threshold: req.body.battery_warning_threshold,
            login_credentials: {
                password: req.body.login_credentials.password,
                online: req.body.login_credentials.online
                }},
            function(err, manager){
                if (err) {
                    res.send("Dis not good, create no goodie");
                } else {
                    res.json("insert da data yo");
                }
            });
    } catch (e){
        console.log(e);
        res.send("Something wong, no try is good enough: " + e)
    }
}