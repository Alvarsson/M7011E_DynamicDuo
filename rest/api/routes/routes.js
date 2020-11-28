'use strict';

module.exports = function(app) {
	var prosumer = require('../controllers/prosumerController');

	
	app.route('/test') //will need test?id="lisa" for example as query parameter
		.get(prosumer.get_prosumer_setting)
		.post(prosumer.add_prosumer_setting);

	app.route('/test/:id')
		.get(prosumer.get_prosumer_setting)
		.put(prosumer.update_prosumer_settings);
	//app.route('/tasks/:taskId')
	// 	.get(todoList.read_a_task)
	// 	.put(todoList.update_a_task)
	// 	.delete(todoList.delete_a_task);
};
