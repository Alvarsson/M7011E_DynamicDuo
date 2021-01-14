'use strict'

var mongoose = require('mongoose'),
Util = require('../util/api_utils'),
BodyMaps = require('./bodyMaps'),
WindSpeed = mongoose.model('WindSpeed');

exports.get_wind_speed = function(req,res) {
    console.log(req.params.tick)
    WindSpeed.findOne({tick: req.params.tick}, function(err, wind) {
        if (err) {
            console.log(err)
            res.statusCode = 400;
            res.send("Could not fetch the wind speed.");
        } else {

            if (wind != null) {
                res.statusCode = 200;
                res.json(wind);
            } else {
                res.statusCode = 404;
                res.send("No return.");
            }
        }
    });
   
}

// Är det dumt att inserta all denna data med ett api-kall per tick?
exports.add_wind_speed = function(req, res){
    var valid = Util.validBody(req, BodyMaps.add_wind_speedMap());
    if (!valid) {
        res.statusCode = 400;
        res.send('Bad request, no wind added.');
    } else {
        WindSpeed.create({tick: req.body.tick,
        wind_speed: req.body.wind_speed},
        function(err, wind) {
            if(err) {
                res.statusCode = 418;
                res.send('Oh, someone does not have medvind right now.');
            } else {
                res.statusCode = 200;
                res.json('Wind data inserted.');
            }
        });
    }
}

exports.add_wind_speed_many = function(req, res){
    
    WindSpeed.insertMany(req.body, function(err, wind) {
        if(err) {
            res.statusCode = 418;
            res.send('Oh, someone does not have medvind right now.');
        } else {
            res.statusCode = 200;
            res.json('Wind data inserted.');
        }
    });
    
}