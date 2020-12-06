var express = require('express'),
app = express(),
port = process.env.BACKEND_PORT_HOST || 100000,
mongoose = require('mongoose'),
Prosumer = require('./api/models/prosumer_settings_model'),
ProsumerLog = require('./api/models/prosumer_log_model'),
Manager = require('./api/models/manager_settings_model'),
<<<<<<< HEAD
ManagerLog = require('./api/models/manager_log_model'),
WindSPeed = require('./api/models/wind_speed_model'),
Blackout = require('./api/models/blackout_model'),
=======
ManagerLog = require('./api/models/manager_log_model')

var cors = require('cors')

app.use(cors())
app.options('*',cors())

>>>>>>> 8ae0f04... small changes in backend. Added cors settings and some prints for debugging. Added a component to the homepage. Very WIP

bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${process.env.MONGO_HOSTNAME}/${process.env.MONGO_DATABASE}`,{useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var routes = require('./api/routes/routes');
routes(app);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found. Make a valid request pls.'})
});

app.listen(port);

console.log('REST API server started on: ' + port)