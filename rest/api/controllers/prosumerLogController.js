'use strict';

var mongoose = require('mongoose'),
Util = require('../util/api_utils'),
BodyMaps = require('./bodyMaps'),
ProsumerLog = mongoose.model('ProsumerLog');

// TODO: get all prosumer logs for one prosumer.

// get all the logs for a given prosumer
exports.get_all_prosumer_logs = function(req,res) {
    ProsumerLog.find({id:req.params.id}, function(err, prosumer) {
        if (err) {
            res.statusCode = 400;
            res.send("Couldn't fetch the prosumer logs.");
        } else {
            if (prosumer != null) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(prosumer);
            } else {
                res.statusCode = 404;
                res.send();
            }
        }
    });
}

// get the latest log for a given prosumer
exports.get_latest_prosumer_log = function(req, res) {
    ProsumerLog.find({id:req.params.id}, function(err, prosumer) {
        if (err) {
            res.statusCode = 400;
            res.send("Couldn't fetch the latest log.");
        } else {
            if (prosumer != null) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(prosumer);
            } else {
                res.statusCode = 404;
                res.send();
            }
        }
    }).sort({_id:"-1"}).limit(1);
}

exports.delete_prosumer_logs = function(req,res) {
    ProsumerLog.deleteMany({id: req.params.id}, function(err, prosumer) {
        if (err) {
            res.statusCode = 418;
            res.send("Couldn't find any logs for that prosumer");
        } else {
            res.statusCode = 200;
            res.send("The prosumer logs are deleted");
        }
    });
}

// add a prosumer log for specific prosumer id
exports.add_prosumer_log = function(req,res) {
    var valid = Util.validBody(req, BodyMaps.add_prosumer_logMap());
    if(!valid) {
        res.statusCode = 400;
        res.send('Bad request, no prosumer log added');
    } else {
        ProsumerLog.create({id: req.body.id,
        consumption: req.body.consumption,
        production: req.body.production,
        tick: req.body.tick,
        battery_level: req.body.battery_level,
        broken_turbine: req.body.broken_turbine,
        weather: {
            wind_speed: req.body.weather.wind_speed,
            temperature: req.body.weather.temperature
        }},
        function(err, prosumer){
            if(err) {
                res.statusCode = 418;
                res.send("Even a teapot cant create this prosumer log");
            } else {
                res.json("Prosumer log created.");
            }
        });
    }
}