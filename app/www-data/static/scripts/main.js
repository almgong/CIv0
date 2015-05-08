requirejs.config({
	baseUrl: '../static/scripts/lib',
	paths: {
		jquery: 'jquery-2.1.4.min',
		bb: 'backbone-min',
		bootstrap: 'bootstrap.min',
		appViews: '../appViews',
		apiClient: '../apiClient',
		addChime: '../addChime',
		autogrow: 'autogrow'
	}

});

/***
 * INITIALIZATION + APP LOGIC
 ***/
require(['jquery', 'bb'], function($, BB) {
	require(['bootstrap', 'appViews'], function(bt, appViews) {

		window.localStorage = {}; //for storage of client side utilities

		// BACKBONE APP
		var MainApp = Backbone.Router.extend({
			routes: {
				"/": "index", //landing page
				"/main": "authenticatedIndex", 				//user logged in successfully
				"/main/:next": "authenticatedIndexRedirect"	//logged in, with redirect
			},

			index:function() {
				console.log('landing page')
			},
			authenticatedIndex:function() {
				console.log('logged in')
			},
			authenticatedIndexRedirect:function(next) {
				console.log('nice, now go to' + next)
			}

		});
		
		var app = new MainApp() // our app

		/***
		 * On Page Load
		 ***/
		 $(function() {
		 	appViews.loadMainPageViews();


			/***
			* NAVIGATION
			***/
			$('.navbar-brand').on('click', function() {
				console.log('eyyy')
				app.navigate("/", {trigger:true})
			});

			$('a.login').on('click', function() {
				console.log('eyyy')
				app.navigate("/main", {trigger:true});
			});


		 });

	});
});