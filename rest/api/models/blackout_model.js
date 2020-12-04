'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProsumerBlackoutSchema = new Schema({
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
module.exports = mongoose.model('ProsumerBlackout', ProsumerBlackoutSchema);

var ConsumerBlackoutSchema = new Schema({
    id: {
        type: String,
        Unique: false,
    },
    tick: {
        type: Number
    },
    amount: {
        type: Number
    }
})
module.exports = mongoose.model('ConsumerBlackout', ConsumerBlackoutSchema);