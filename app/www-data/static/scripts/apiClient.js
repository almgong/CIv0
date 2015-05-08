/** API Client **/
define([], function() {

var test = function() {
	console.log('success!')
};

var login = function(callback) {
	$.ajax({
		method: "POST",
		url:'/login',
		data:{},
		success:function(data) {
			window.localStorage.sessionToken = data;
			callback();
			console.log('logged in');
		},
		error:function() {
			console.log('error')
		}
	});
};

//data = { time: [] , title:[], description:[], ... }
var addNewChime = function(data) {
	console.log(data)

	$.ajax({
		method: "POST",
		url:'/add_chime',
		data:data,
		success:function(data) {
			console.log(data)
			console.log('succs')
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
