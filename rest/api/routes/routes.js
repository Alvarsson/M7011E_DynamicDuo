'use strict';

module.exports = function(app) {
	var prosumer = require('../controllers/prosumerController');
	var manager = require('../controllers/managerController');
	//  If we want to use several files with just the route variable name, we could create the index file and export from there.
	
	// --------- PROSUMER ---------
	app.route('/test') //will need test/lisa for example as query parameter
		.get(prosumer.get_prosumer_setting)
		.post(prosumer.add_prosumer_setting);

	app.route('/test/:id')
		.get(prosumer.get_prosumer_setting);
	app.route('/test/:id/img_url')
		.put(prosumer.update_prosumer_settings_img_url);
	app.route('/test/:id/password')
		.put(prosumer.update_prosumer_settings_password);
	app.route('/test/:id/online')
		.put(prosumer.update_prosumer_settings_online);
	app.route('/test/:id/distr_over')
		.put(prosumer.update_prosumer_settings_distr_over);
	app.route('/test/:id/distr_under')
		.put(prosumer.update_prosumer_settings_distr_under);
	app.route('/test/:id/battery_warning_threshold')
		.put(prosumer.update_prosumer_settings_battery_warning_threshold);
	//app.route('/tasks/:taskId')
	// 	.get(todoList.read_a_task)
	// 	.put(todoList.update_a_task)
	// 	.delete(todoList.delete_a_task);
	
	// --------- MANAGER ---------

	app.route('/testmanager')
		.get(manager.get_manager_setting)
		.post(manager.add_manager_setting);
};
