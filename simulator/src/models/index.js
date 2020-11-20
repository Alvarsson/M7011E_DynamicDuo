
const mongoose = require("mongoose");

const db = {};
db.mongoose = mongoose;
db.url = `mongodb://${process.env.MONGO_HOSTNAME}/${process.env.MONGO_DATABASE}`;
db.testmodel = require("./models.js")(mongoose);
db.weatherSpeeds = require("./weatherSpeeds.js")(mongoose);

module.exports = db;