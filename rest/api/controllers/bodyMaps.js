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
    body.set('blocked', 0);
    body.set('broken', 0);
    body.set('blackout', 0);
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

// marketprice
module.exports.market_priceMap = function(){
    var root = new Map();
    var body = new Map();
    body.set('market_price', 0);
    root.set('body', body);
    return root;
}

// PP_status
module.exports.PP_statusMap = function(){
    var root = new Map();
    var body = new Map();
    body.set('PP_status', 0);
    root.set('body', body);
    return root;
}
// inc_status_change
module.exports.inc_status_changeMap = function(){
    var root = new Map();
    var body = new Map();
    var inc = new Map();
    inc.set('timer', 0);
    inc.set('new_status', 0);
    body.set('inc_status_change', inc);
    root.set('body', body);
    return root;
}
// inc_prod_change
module.exports.inc_prod_changeMap = function(){
    var root = new Map();
    var body = new Map();
    var inc = new Map();
    inc.set('timer', 0);
    inc.set('new_prod', 0);
    body.set('inc_prod_change', inc);
    root.set('body', body);
    return root;
}

// production
module.exports.productionMap = function(){
    var root = new Map();
    var body = new Map();
    body.set('production', 0);
    root.set('body', body);
    return root;
}

// prosumer blocked
module.exports.blockedMap = function(){
    var root = new Map();
    var body = new Map();
    body.set('blocked', 0);
    root.set('body', body);
    return root;
}

// prosumer turbine broken
module.exports.brokenMap = function(){
    var root = new Map();
    var body = new Map();
    body.set('broken', 0);
    root.set('body', body);
    return root;
}

// prosumer turbine broken
module.exports.blackoutMap = function(){
    var root = new Map();
    var body = new Map();
    body.set('blackout', 0);
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
    body.set('net_production', 0);
    body.set('tick', 0);
    body.set('battery_level', 0);
    body.set('broken', 0);
    root.set('body', body);
    return root;
}


// add manager logg map
module.exports.completeManagerMap = function(){
    var root = new Map();
    var body = new Map();
    var login = new Map();
    var distribution = new Map();
    var inc_status_change = new Map();
    var inc_prod_change = new Map();
    inc_prod_change.set('timer', 0);
    inc_prod_change.set('new_prod', 0);
    inc_status_change.set('timer', 0);
    inc_status_change.set('new_status', 0);
    login.set('password', 0);
    login.set('online', 0);
    distribution.set('sell', 0);
    distribution.set('store', 0);
    body.set('market_price', 0);
    body.set('production', 0);
    body.set('PP_status', 0);
    body.set('inc_status_change', inc_status_change);
    body.set('inc_prod_change', inc_prod_change);
    body.set('login_credentials', login);
    body.set('img_url', 0);
    body.set('battery_warning_threshold', 0);
    body.set('distribution', distribution);
    root.set('body', body);
    return root;
}

module.exports.add_manager_logMap = function(){
    var root = new Map();
    var body = new Map();
    body.set('market_price', 0);
    body.set('PP_status', 0);
    body.set('market_demand', 0);
    body.set('battery_level', 0);
    body.set('production', 0);
    body.set('tick', 0);
    body.set('power_plant_consumption', 0);
    body.set('recommended_market_price', 0);
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



