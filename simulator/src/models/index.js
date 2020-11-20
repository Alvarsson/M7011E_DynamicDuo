const dbConfig = require("../db.config");

const mongoose = require("mongoose");

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.testmodel = require("./models.js")(mongoose);

module.exports = db;