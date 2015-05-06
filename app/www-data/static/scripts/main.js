requirejs.config({
	baseUrl: '../static/scripts/lib',
	paths: {
		jquery: 'jquery-2.1.4.min',
		bb: 'backbone-min',
		bootstrap: 'bootstrap.min',
		appViews: '../appViews'
	}

});

/***
 * INITIALIZATION + APP LOGIC
 ***/
require(['jquery', 'bb'], function($, BB) {
	require(['bootstrap', 'appViews'], function(bt, appViews) {

		appViews.loadMainPageViews();

		// BACKBONE APP
		var MainApp = Backbone.Router.extend({
			routes: {
				"/": "index" //landing page
			},

			index : function() {
				console.log('landing page')
			}

		});
		
		var app = new MainApp() // our app
		

		/***
		 * NAVIGATION
		 ***/
		$('.navbar-brand').on('click', function() {
			app.navigate("/", {trigger:true})
		});

	});
});