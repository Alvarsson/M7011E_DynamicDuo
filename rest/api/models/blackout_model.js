'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlackoutSchema = new Schema({
    id: {
        type: String,
        Unique: false,
        Required: "Please add a prosumer id."
    },
    tick: {
        type: Number
    },
    amount: {
        type: Number
    }
})
module.exports = mongoose.model('Blackout', BlackoutSchema);