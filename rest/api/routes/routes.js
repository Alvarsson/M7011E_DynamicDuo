'use strict';

module.exports = function(app) {
	var prosumer = require('../controllers/prosumerController');
	var prosumer_log = require('../controllers/prosumerLogController');
	var manager = require('../controllers/managerController');
	var manager_log = require('../controllers/managerLogController');
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
	
	app.route('/prosumersettings/:id/delete') // delete the specific prosumer  settings
		.delete(prosumer.delete_prosumer_settings);
	

	// ---- log ----
	app.route('/prosumerlog') // add a prosumer log
		.post(prosumer_log.add_prosumer_log);
	app.route('/prosumerlog/:id/getall') // get all specific prosumer logs
		.get(prosumer_log.get_all_prosumer_logs);
	app.route('/prosumerlog/:id/getlatest') // get latest specific prosumer log
		.get(prosumer_log.get_latest_prosumer_log);
	app.route('/prosumerlog/:id/delete') // delete all specific prosumer logs
		.delete(prosumer_log.delete_prosumer_logs);
	

	// --------- MANAGER ---------

	// ---- settings ----
	app.route('/managersettings') // add manager settings
		.get(manager.get_manager_setting)
		.post(manager.add_manager_setting);
	
	app.route('/managersettings/get') // get the manager settings
		.get(manager.get_manager_setting);	
	app.route('/managersettings/img_url') // set the manager img_url
		.put(manager.update_manager_setting_img_url);
	app.route('/managersettings/password') // set the manager password
		.put(manager.update_manager_setting_password);
	app.route('/managersettings/online') // set the manager online number
		.put(manager.update_manager_settings_online);
	app.route('/managersettings/battery_warning_threshold') // set the manager battery threshold warning
		.put(manager.update_manager_settings_battery_warning_threshold);
	app.route('/managersettings/delete') // delete the manager settings
		.delete(manager.delete_manager_settings);

	// ---- log ----
	app.route('/managerlog') // add a manager log
		.post(manager_log.add_manager_log);
	app.route('/managerlog/getall') // get all manager logs
		.get(manager_log.get_all_manager_logs);
	app.route('/managerlog/getlatest') // get latest manager log
		.get(manager_log.get_latest_manager_log);
	app.route('/managerlog/delete') // delete all manager logs
		.delete(manager_log.delete_manager_logs);
};
