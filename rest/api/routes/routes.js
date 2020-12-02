'use strict';

module.exports = function(app) {
	var prosumer = require('../controllers/prosumerController');
	var manager = require('../controllers/managerController');
	//  If we want to use several files with just the route variable name, we could create the index file and export from there.
	
	// --------- PROSUMER ---------
	app.route('/prosumersettings')
		//.get(prosumer.get_prosumer_setting) // Should return all prosumer settings, TODO: write controller
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
	
	// --------- MANAGER ---------

	app.route('/testmanager')
		.get(manager.get_manager_setting)
		.post(manager.add_manager_setting);
};
