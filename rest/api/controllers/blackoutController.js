'use strict'

var mongoose = require('mongoose'),
Util = require('../util/api_utils'),
BodyMaps = require('./bodyMaps'),
Blackout = mongoose.model('Blackout');

// get latest prosumer blackout data
exports.get_all_blackouts = function(req,res){
    Blackout.find({id: req.params.id}, function(err, prosumer){
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
exports.add_blackout = function(req,res){
    var valid = Util.validBody(req, BodyMaps.add_blackoutMap());
    if (!valid) {
        res.statusCode = 400;
        res.send("Bad request, no blackout data added.");
    } else {
        Blackout.create({id: req.body.id,
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