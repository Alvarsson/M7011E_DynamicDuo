
const mongoose = require("mongoose");

const db = {};
db.mongoose = mongoose;
db.url = `mongodb://${process.env.MONGO_HOSTNAME}/${process.env.MONGO_DATABASE}`;
db.testmodel = require("./models.js")(mongoose);
db.weatherSpeeds = require("./weatherSpeeds.js")(mongoose);
// Prosumer setting might not be the best place to put the authentication.
db.prosumerSetting = require("./prosumerSettings.js")(mongoose),bcrypt = require(bcrypt), SALT_WORK_FACTORY = 10;
db.prosumerLog = require("./prosumerSettings.js")(mongoose);

module.exports = db;