'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WeatherSchema = new Schema ({
    wind_speed: {
        type: Number
    },
    temperature: {
        type: Number
    }
});

var ProsumerLogSchema = new Schema ({
    id: {
        type: String,
        Unique: false,
        Required: "Enter the prosumer ID"
    },
    consumption: {
        type: Number
    },
    production: {
        type: Number
    },
    net_production: {
        type:Number
    },
    tick: {
        type: Number
    },
    battery_level: {
        type: Number
    },
    broken_turbine: {
        type: Number
    },
    weather: {
        type: WeatherSchema,
        Required: "Need some weather up in dis house"
    }
});

module.exports = mongoose.model('ProsumerLog', ProsumerLogSchema);