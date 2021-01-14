'use strict'

var mongoose = require('mongoose'),
Util = require('../util/api_utils'),
BodyMaps = require('./bodyMaps'),
ManagerLog = mongoose.model('ManagerLog');

// get all the manager logs
exports.get_all_manager_logs = function(req,res) {
    ManagerLog.find({id: "Manager"}, function(err, manager){
        if (err) {
            res.statusCode = 400;
            res.send("Couldn't fetch the manager logs.");
        } else {
            if (manager != null) {
                res.statusCode = 200;
                res.setHeader('Content_Type', 'application/json');
                res.json(manager);
            } else {
                res.statusCode = 404;
                res.send();
            }
        }
    });
}

// get latest log for the manager
exports.get_latest_manager_log = function(req,res) {
    ManagerLog.find({id: "Manager"}, function(err,manager) {
        if(err) {
            res.statusCode = 400;
            res.send("Couldn't get the latest log.");
        } else {
            if (manager != null) {
                res.statusCode = 200;
                res.json(manager);
            } else {
                res.statusCode = 404;
                res.send();
            }
            
        }
    }).sort({_id: "-1" }).limit(1);
}

// delete the mangaer logs
exports.delete_manager_logs = function(req,res) {
    ManagerLog.deleteMany({id: "Manager"}, function(err, manager) {
        if(err) {
            res.statusCode = 418;
            res.send("Couldn't find any logs for the manager");
        } else {
            res.statusCode = 200;
            res.send("The manager logs are now deleted");
        }
    });
} 

// add a manager log
exports.add_manager_log = function(req,res) {
    var valid = Util.validBody(req, BodyMaps.add_manager_logMap());
    if(!valid) {
        res.statusCode = 400;
        res.send('Bad request, no manager log added');
    } else {
        ManagerLog.create({id: "Manager",
        PP_status: req.body.PP_status,
        market_demand: req.body.market_demand,
        recommended_market_price: req.body.recommended_market_price,
        market_price: req.body.market_price,
        battery_level: req.body.battery_level,
        production: req.body.production,
        tick: req.body.tick,
        power_plant_consumption: req.body.power_plant_consumption,
        nr_of_consumers: req.body.nr_of_consumers
        },
        function(err, manager){
            if(err) {
                res.statusCode = 418;
                res.send('A teapot tried to create this log, but failed');
            } else {
                res.json('Manager log created.');
            }
        });
    }
}