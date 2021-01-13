'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ManagerLogSchema = new Schema({
    id: {
        type: String,
        Unique: false,
        Required: "Need a manager ID"
    },
    PP_status: {
        type: Number
    },
    recommended_market_price: {
        type: Number
    },
    market_demand: {
        type: Number
    },
    market_price: {
        type: Number
    },
    battery_level: {
        type: Number
    },
    production: {
        type: Number
    },
    tick: {
        type: Number
    },
    total_net_consumption: {
        type: Number
    },
    power_plant_consumption: {
        type: Number
    },
    nr_of_consumers: {
        type: Number
    }
});

module.exports = mongoose.model('ManagerLog', ManagerLogSchema);