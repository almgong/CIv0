var model = require('../models/model');
/** Controller functions 

addChime(req, res, callback)  //add a new chime, next=callback




**/

var exports = module.exports;

exports.addChime = function(req, res, next) {

	var response = function(success) {
		if(success) {
			next(200, {});
		}
	};

	model.addChime(req.body, response)
};

