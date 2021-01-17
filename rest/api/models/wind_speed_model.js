'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WindSpeedSchema = new Schema({
    tick: {
        type: Number
    },
    wind_speed: {
        type: Number
    }
});

module.exports = mongoose.model('WindSpeed', WindSpeedSchema);