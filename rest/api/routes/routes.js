'use strict';

module.exports = function(app) {
	var prosumer = require('../controllers/prosumerController');
	var manager = require('../controllers/managerController');
	//  If we want to use several files with just the route variable name, we could create the index file and export from there.
	
	// --------- PROSUMER ---------
	app.route('/test') //will need test?id="lisa" for example as query parameter
		.get(prosumer.get_prosumer_setting)
		.post(prosumer.add_prosumer_setting);

	app.route('/test/:id')
		.get(prosumer.get_prosumer_setting);
	app.route('/test/:id/img_url')
		.put(prosumer.update_prosumer_settings_img_url);
	
	// --------- MANAGER ---------

	app.route('/addman')
		.get(manager.get_manager_setting)
		.post(manager.add_manager_setting);
	
	app.route('/man/setimg')
		.put(manager.update_manager_setting_img_url);
};
