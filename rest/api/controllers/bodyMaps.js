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