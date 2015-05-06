requirejs.config({
	baseUrl: '../static/scripts/lib',
	paths: {
		jquery: 'jquery-2.1.4.min',
		bb: 'backbone-min',
		bootstrap: 'bootstrap.min'
	}

});

require(['jquery', 'bb'], function($, BB) {
	require(['bootstrap'], function() {


		console.log('yay')

	});
});