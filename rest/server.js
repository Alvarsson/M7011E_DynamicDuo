var express = require('express'),
app = express(),
port = process.env.BACKEND_PORT_HOST || 100000,
mongoose = require('mongoose'),
util = require('./api/util/api_utils'),
Prosumer = require('./api/models/prosumer_settings_model'),
ProsumerLog = require('./api/models/prosumer_log_model'),
Manager = require('./api/models/manager_settings_model'),
ManagerLog = require('./api/models/manager_log_model'),
WindSpeed = require('./api/models/wind_speed_model'),
Blackout = require('./api/models/blackout_model'),
ManagerLog = require('./api/models/manager_log_model')
// manager = require('./api/controllers/managerController')
var cors = require('cors')

app.use(cors({
    origin: 'http://localhost:3000',
    credentials : true
  }))

//app.options(corsOptions,cors())


User = require('./api/models/user_model'),
cookieParser = require('cookie-parser'),
bodyParser = require('body-parser');


// mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${process.env.MONGO_HOSTNAME}/${process.env.MONGO_DATABASE}`,{useNewUrlParser: true, useUnifiedTopology: true});

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// parse requests of content-type - application/json
app.use(bodyParser.json({limit: '50mb'}));
app.use(cookieParser());



var routes = require('./api/routes/routes');
routes(app);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found. Make a valid request pls.'})
});

app.listen(port);

/* app.post(manager.add_manager_setting, function(){

}) */

console.log('REST API server started on: ' + port)