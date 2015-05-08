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



return {
	test:test,
	login:login
}


}); //end define
