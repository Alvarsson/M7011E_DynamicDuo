'use strict';
const mongoose = require('mongoose');


const ManagerSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    marketprice: Number,
    production: Number,
});

module.exports = mongoose.model('Manager', ManagerSchema);

// could i use default to use precious value in db as current? Or is that not neccesary.