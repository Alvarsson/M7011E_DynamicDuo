'use strict';

module.exports = function(app) {
	var todoList = require('../controllers/todoListController');
	var prosumer = require('../controllers/prosumerController');

	// todoList Routes
	app.route('/taskz')
		//.get(todoList.list_all_tasks)
		//.post(todoList.create_a_task)
		.get(todoList.lisas);
	app.route('/test') //will need test?id="lisa" for example as query parameter
		.get(prosumer.get_prosumer_settings)
		.put(prosumer.update_prosumer_settings);

	//app.route('/tasks/:taskId')
	// 	.get(todoList.read_a_task)
	// 	.put(todoList.update_a_task)
	// 	.delete(todoList.delete_a_task);
};
