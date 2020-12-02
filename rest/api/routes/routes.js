'use strict';

module.exports = function(app) {
	var prosumer = require('../controllers/prosumerController');
	var prosumer_log = require('../controllers/prosumerLogController');
	var manager = require('../controllers/managerController');
	//  If we want to use several files with just the route variable name, we could create the index file and export from there.
	
	// --------- PROSUMER ---------

	// ---- settings ----
	app.route('/prosumersettings')
		.get(prosumer.get_all_prosumer_settings) // Should return all prosumer settings
		.post(prosumer.add_prosumer_setting); // add new prosumer setting

	app.route('/prosumersettings/:id')
		.get(prosumer.get_prosumer_setting); // Get prosumer setting for id
	app.route('/prosumersettings/:id/img_url')
		.put(prosumer.update_prosumer_settings_img_url); // update img_url for id
	app.route('/prosumersettings/:id/password')
		.put(prosumer.update_prosumer_settings_password); // update password for id
	app.route('/prosumersettings/:id/online')
		.put(prosumer.update_prosumer_settings_online); // update online for id
	app.route('/prosumersettings/:id/distr_over')
		.put(prosumer.update_prosumer_settings_distr_over); // update over distr for id
	app.route('/prosumersettings/:id/distr_under')
		.put(prosumer.update_prosumer_settings_distr_under); // update under distr for id
	app.route('/prosumersettings/:id/battery_warning_threshold')
		.put(prosumer.update_prosumer_settings_battery_warning_threshold); // update battery warn threshold for id
	
	app.route('/prosumersettings/:id/delete')
		.delete(prosumer.delete_prosumer_settings);
	// ---- log ----
	app.route('/prosumerlog')
		.post(prosumer_log.add_prosumer_log);

	app.route('/prosumerlog/:id')
		.get(prosumer_log.get_prosumer_log);
	
	app.route('/prosumerlog/:id/delete')
		.delete(prosumer_log.delete_prosumer_logs);
	
	// --------- MANAGER ---------

	app.route('/man')
		.post(manager.add_manager_setting);
	
	app.route('/getman')
		.get(manager.get_manager_setting);	
	app.route('/man/img_url')
		.put(manager.update_manager_setting_img_url);
	app.route('/man/password')
		.put(manager.update_manager_setting_password);
	app.route('/man/online')
		.put(manager.update_manager_settings_online);
	app.route('/man/battery_warning_threshold')
		.put(manager.update_manager_settings_battery_warning_threshold);
	app.route('/man/delete')
		.delete(manager.delete_manager_settings);
};
