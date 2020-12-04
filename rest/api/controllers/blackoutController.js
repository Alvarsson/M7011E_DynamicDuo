'use strict'

var mongoose = require('mongoose'),
Util = require('../util/api_utils'),
BodyMaps = require('./bodyMaps'),
ProsumerBlackout = mongoose.model('ProsumerBlackout'),
ConsumerBlackout = mongoose.model('ConsumerBlackout');

// get latest prosumer blackout data
exports.get_prosumer_blackout = function(req,res){
    ProsumerBlackout.find({id: req.params.id}, function(err, prosumer){
        if(err) {
            res.statusCode = 400;
            res.send("Could not get the blackout data.");
        } else {
            if (prosumer != null) {
                res.statusCode = 200;
                res.json(prosumer);
            } else {
                res.statusCode = 404;
                res.send("Blackout data empty.");
            }
        }
    }).sort({_id: "-1"}).limit(1);
}

// add prosumer blackout data
exports.add_prosumer_blackout = function(req,res){
    var valid = Util.validBody(req, BodyMaps.add_blackoutMap());
    if (!valid) {
        res.statusCode = 400;
        res.send("Bad request, no blackout data added.");
    } else {
        ProsumerBlackout.create({id: req.body.id,
        tick: req.body.tick,
        amount: req.body.amount
        },
        function(err, prosumer){
            if (err){
                res.statusCode = 418;
                res.send("There has been an accident...");
            } else {
                res.json('Prosumer blackout data created');
            }
        });
    }
}

// get latest consumer blackout data
exports.get_consumer_blackout = function(req,res){
    ConsumerBlackout.find({id: req.params.id}, function(err, consumer){
        if(err) {
            res.statusCode = 400;
            res.send("Could not get the blackout data.");
        } else {
            if (prosumer != null) {
                res.statusCode = 200;
                res.json(consumer);
            } else {
                res.statusCode = 404;
                res.send("Blackout data empty.");
            }
        }
    }).sort({_id: "-1"}).limit(1);
}

// dessa verkligen ha id?
exports.add_consumer_blackout = function(req,res){
    var valid = Util.validBody(req, BodyMaps.add_blackoutMap());
    if (!valid) {
        res.statusCode = 400;
        res.send("Bad request, no blackout data added.");
    } else {
        ConsumerBlackout.create({id: req.body.id,
        tick: req.body.tick,
        amount: req.body.amount
        },
        function(err, consumer){
            if (err){
                res.statusCode = 418;
                res.send("There has been an accident...");
            } else {
                res.json('Consumer blackout data created');
            }
        });
    }
}