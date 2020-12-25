'use strict';

module.exports = function(app) {
	var prosumer = require('../controllers/prosumerController');
	var prosumer_log = require('../controllers/prosumerLogController');
	var manager = require('../controllers/managerController');
	var manager_log = require('../controllers/managerLogController');
	var wind_speed = require('../controllers/windSpeedController');
	var blackout = require('../controllers/blackoutController');
	const { RegisterUser, LoginUser, LogoutUser, getUserDetails } = require('../controllers/authController');
	//const { auth } = require('../middleware/auth');
	
	//  If we want to use several files with just the route variable name, we could create the index file and export from there.
	
// TODO:
// - prosumer setting should be created when registering a prosumer
// - /*auth*/ protocol to get prosumer settings and rest


	// --------- PROSUMER ---------

	// ---- settings ----
	app.route('/prosumersettings') 
		.get(prosumer.get_all_prosumer_settings) // Should return all prosumer settings
		.post(prosumer.add_prosumer_setting); // add new prosumer setting

	app.route('/prosumersettings/:id')
		.get(/*auth*,*/prosumer.get_prosumer_setting);     //Get prosumer setting for id
	app.route('/prosumersettings/:id/img_url')
		.put(/*auth*,*/prosumer.update_prosumer_settings_img_url); // update img_url for id
	app.route('/prosumersettings/:id/password')
		.put(/*auth*,*/prosumer.update_prosumer_settings_password); // update password for id
	app.route('/prosumersettings/:id/online')
		.put(/*auth*,*/prosumer.update_prosumer_settings_online); // update online for id
	app.route('/prosumersettings/:id/distr_over')
		.put(/*auth*,*/prosumer.update_prosumer_settings_distr_over); // update over distr for id
	app.route('/prosumersettings/:id/distr_under')
		.put(/*auth*,*/prosumer.update_prosumer_settings_distr_under); // update under distr for id
	app.route('/prosumersettings/:id/battery_warning_threshold')
		.put(/*auth*,*/prosumer.update_prosumer_settings_battery_warning_threshold); // update battery warn threshold for id
	app.route('/prosumersettings/:id/block')
		.put(/*auth*,*/prosumer.update_prosumer_settings_blocked); // update blocked timer for id
	
	app.route('/prosumersettings/:id/delete') // delete the specific prosumer  settings
		.delete(/*auth*,*/prosumer.delete_prosumer_settings);
	

	// ---- log ----
	app.route('/prosumerlog') // add a prosumer log
		.post(prosumer_log.add_prosumer_log);
	app.route('/prosumerlog/:id/getall') // get all specific prosumer logs
		.get(prosumer_log.get_all_prosumer_logs);
	app.route('/prosumerlog/:id/getlatest/:limit?') // get latest specific prosumer log, with optional limiter
		.get(/*auth*,*/prosumer_log.get_latest_prosumer_log);
	app.route('/prosumerlog/:id/delete') // delete all specific prosumer logs
		.delete(prosumer_log.delete_prosumer_logs);
	

	// --------- MANAGER ---------

	// ---- settings ----
	app.route('/managersettings') // add manager settings
		.get(manager.get_manager_setting)
		.post(manager.add_manager_setting);
	
	app.route('/managersettings/get') // get the manager settings
		.get(/*auth*,*/ manager.get_manager_setting);	
	app.route('/managersettings/img_url') // set the manager img_url
		.put(/*auth*,*/ manager.update_manager_setting_img_url);
	app.route('/managersettings/password') // set the manager password
		.put(/*auth*,*/ manager.update_manager_setting_password);
	app.route('/managersettings/online') // set the manager online number
		.put(/*auth*,*/ manager.update_manager_settings_online);
	app.route('/managersettings/battery_warning_threshold') // set the manager battery threshold warning
		.put(/*auth*,*/ manager.update_manager_settings_battery_warning_threshold);
	app.route('/managersettings/delete') // delete the manager settings
		.delete(/*auth*,*/ manager.delete_manager_settings);

	// ---- log ----
	app.route('/managerlog') // add a manager log
		.post(manager_log.add_manager_log);
	app.route('/managerlog/getall') // get all manager logs
		.get(manager_log.get_all_manager_logs);
	app.route('/managerlog/getlatest') // get latest manager log
		.get(manager_log.get_latest_manager_log);
	app.route('/managerlog/delete') // delete all manager logs
		.delete(manager_log.delete_manager_logs);

	// ----------- WIND SPEED -----------


	app.route('/windspeed')	// add wind speed data
		.post(wind_speed.add_wind_speed);
	app.route('/windspeed/many') // add many wind speed data
		.post(wind_speed.add_wind_speed_many);
	app.route('/windspeed/:tick') // get wind speed data
		.get(wind_speed.get_wind_speed);

	// ----------- BLACK OUT ------------

	app.route('/prosumer_blackout') // add prosumer blackout data
		.post(blackout.add_prosumer_blackout);
	app.route('/prosumer_blackout/get') // get prosumer blackout data
		.get(blackout.get_prosumer_blackout);
	app.route('/consumer_blackout')// add consumer blackout data
		.post(blackout.add_consumer_blackout);
	app.route('/consumer_blackout/get')// get consumer blackout data
		.get(blackout.get_consumer_blackout);	
	
	// ---------- AUTHENTICATION -------------
	app.route('/login')
		.post(LoginUser);
	app.route('/logout')
		.get(/*auth*,*/ LogoutUser);
	app.route('/register')
		.post(RegisterUser);
	app.route('/details')
		.get(/*auth*,*/ getUserDetails);

};


	