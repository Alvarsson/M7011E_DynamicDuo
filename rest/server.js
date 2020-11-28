var express = require('express'),
app = express(),
port = process.env.BACKEND_PORT_HOST || 100000,
mongoose = require('mongoose'),
ProsumerSettings = require('./api/models/prosumer_settings_model'),
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