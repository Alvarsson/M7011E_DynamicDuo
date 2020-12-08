/* Prosumer Settings maps */
// complete map of prosumerSettings
module.exports.completeProsumerMap = function(){
    var root = new Map();
    var body = new Map();
    var login = new Map();
    var distribution = new Map();
    login.set('password', 0);
    login.set('online', 0);
    distribution.set('sell', 0);
    distribution.set('store', 0);
    distribution.set('buy', 0);
    distribution.set('drain', 0);
    body.set('login_credentials', login);
    body.set('distribution', distribution);
    body.set('img_url', 0);
    body.set('id', 0);
    body.set('battery_warning_threshold', 0);
    root.set('body', body);
    return root;
}

// Password
module.exports.passwordMap = function(){
    var root = new Map();
    var body = new Map();
    var login = new Map();
    login.set('password', 0);
    body.set('login_credentials', login);
    root.set('body', body);
    return root;
}

// online
module.exports.onlineMap = function(){
    var root = new Map();
    var body = new Map();
    var login = new Map();
    login.set('online', 0);
    body.set('login_credentials', login);
    root.set('body', body);
    return root;
}

// distr_over
module.exports.distr_overMap = function(){
    var root = new Map();
    var body = new Map();
    var distr = new Map();
    distr.set('sell', 0);
    distr.set('store', 0);
    body.set('distribution', distr);
    root.set('body', body);
    return root;
}

// distr_under
module.exports.distr_underMap = function(){
    var root = new Map();
    var body = new Map();
    var distr = new Map();
    distr.set('buy', 0);
    distr.set('drain', 0);
    body.set('distribution', distr);
    root.set('body', body);
    return root;
}

// img_url
module.exports.img_urlMap = function(){
    var root = new Map();
    var body = new Map();
    body.set('img_url', 0);
    root.set('body', body);
    return root;
}

// battery_warning_threshold
module.exports.battery_warning_thresholdMap = function(){
    var root = new Map();
    var body = new Map();
    body.set('battery_warning_threshold', 0);
    root.set('body', body);
    return root;
}
module.exports.add_prosumer_logMap = function() {
    var root = new Map();
    var body = new Map();
    var weather = new Map();
    weather.set('wind_speed', 0);
    weather.set('temperature', 0);
    body.set("id", 0);
    body.set('weather', weather);
    body.set('consumption', 0);
    body.set('production', 0);
    body.set('tick', 0);
    body.set('battery_level', 0);
    body.set('broken_turbine', 0);
    root.set('body', body);
    return root;
}


// add manager logg map
module.exports.completeManagerMap = function(){
    var root = new Map();
    var body = new Map();
    var login = new Map();
    login.set('password', 0);
    login.set('online', 0);
    body.set('login_credentials', login);
    body.set('img_url', 0);
    body.set('battery_warning_threshold', 0);
    root.set('body', body);
    return root;
}

module.exports.add_manager_logMap = function(){
    var root = new Map();
    var body = new Map();
    body.set('market_price', 0);
    body.set('battery_level', 0);
    body.set('production', 0);
    body.set('tick', 0);
    body.set('total_net_consumption', 0);
    body.set('power_plant_consumption', 0);
    body.set('nr_of_consumers', 0);
    root.set('body', body);
    return root;
}


module.exports.add_wind_speedMap = function(){
    var root = new Map();
    var body = new Map();
    body.set('tick', 0);
    body.set('wind_speed', 0);
    root.set('body', body);
    return root;
}

module.exports.add_blackoutMap = function(){
    var root = new Map();
    var body = new Map();
    body.set('id', 0);
    body.set('tick', 0);
    body.set('amount', 0);
    root.set('body', body);
    return root;
}



