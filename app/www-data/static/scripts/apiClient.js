/** API Client **/
define([], function() {

var test = function() {
	console.log('success!')
};

var login = function(credentials, callback) {
	$.ajax({
		method: "POST",
		url:'/login',
		data:credentials,
		success:function(data) {
			window.localStorage.user = data.user_id;
			window.localStorage.user_full_name = data.name;
			callback();
			console.log('logged in');
		},
		error:function(err) {
			console.log(err.responseText)
		}
	});
};

//data = { time: [] , title:[], description:[], ... }
var addNewChime = function(data, callback) {
	console.log(data)

	$.ajax({
		method: "POST",
		url:'/add_chime',
		data:data,
		success:function(data) {
			console.log(data)
			console.log('succs')
			callback(); //finish add chime logic
		},
		error:function() {
			console.log('error')
		}
	});

};

return {
	test:test,
	login:login,
	addNewChime:addNewChime
}


}); //end define
