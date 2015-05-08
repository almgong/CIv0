var model = require('../models/model');
/** Controller functions 

addChime(req, res, callback)  //add a new chime, next=callback
getMain(callback) //returns data for the main dashboard (right now just user's chimes)




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


exports.getMain = function(next) {
	var user_id = 1;

	var response = function(data) {
		next(data);
	};
	
	model.getUserChimes(1, response);

};