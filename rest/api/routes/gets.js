'use strict';

module.exports = function(app) {
	var controller = require('../controllers/getController');

    app.route('/get').get(controller.aexl);

	
// get retrieves a msg
// post deliveres a msg
// delete removes a post.
// patch updates a post

};