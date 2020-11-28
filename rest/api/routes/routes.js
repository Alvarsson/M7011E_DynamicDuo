'use strict';

module.exports = function(app) {
	var prosumer = require('../controllers/prosumerController');

	
	app.route('/test') //will need test?id="lisa" for example as query parameter
		.get(prosumer.get_prosumer_settings)
		.put(prosumer.update_prosumer_settings);

	//app.route('/tasks/:taskId')
	// 	.get(todoList.read_a_task)
	// 	.put(todoList.update_a_task)
	// 	.delete(todoList.delete_a_task);
};
