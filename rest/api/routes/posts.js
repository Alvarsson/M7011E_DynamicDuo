'use strict';

module.exports = function(app) {
    var controller = require('../controllers/postController');
    

	// todoList Routes
	app.route('/tasks')
		//.get(todoList.list_all_tasks)
		//.post(todoList.create_a_task)
		.get(controller.lisas);

	
	app.route('/mogenmango').get(controller.mango);
    app.route('/mellanmango').get(controller.mellanmango);
    app.route('/posttoman').post(controller.manager);


	
// get retrieves a msg
// post deliveres a msg
// delete removes a post.
// patch updates a post

};