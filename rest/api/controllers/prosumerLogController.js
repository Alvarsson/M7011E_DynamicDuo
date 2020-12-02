'use strict';

var mongoose = require('mongoose'),
ProsumerLog = mongoose.model('ProsumerLog');

exports.get_prosumer_log = function(req,res) {
    ProsumerLog.findOne({id:req.params.id}, function(err, prosumer) {
        if (err) {
            res.send("Couldn't fetch the prosumer log.");
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

exports.add_prosumer_log = function(req,res) {
    try{
        if(req.body.id == undefined) {
            throw "Cant log prosumer data without ID.";
        }
        if(req.body.consumption == undefined) {
            throw "Cant log prosumer data without consumption.";
        }
        if(req.body.production == undefined) {
            throw "Cant log prosumer data without production.";
        }
        if(req.body.tick == undefined) {
            throw "Cant log prosumer data without tick.";
        }
        if(req.body.battery_level == undefined) {
            throw "Cant log prosumer data without battery level";
        }
        if(req.body.broken_turbine == undefined) {
            throw "Cant log prosumer data without turbine status";
        }
        if(req.body.weather == undefined
            || req.body.weather.wind_speed == undefined
            || req.body.weather.temperature == undefined) {
                throw "Cant log prosumer data withour weather";
            }
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
    } catch (e) {
        console.log(e);
        res.statusCode = 418;
        res.send("OH NO NO NO, try no goodie: " + e)
    }
}