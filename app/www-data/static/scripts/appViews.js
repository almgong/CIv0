define([
	'bb',
	'apiClient',
	'text!../templates/main_dashboard.template.html',
	'text!../templates/main_intro.template.html',
	'magPopup'
	], function(Backbone, api, dashboardHTMl, introHTML, mpopup) {

	var landing = null;

	var LandingPage = Backbone.View.extend({
		el: $('#main'),
		render:function() {
			var self = this;
			$.ajax({
				method: "GET",
				url:'/main',
				success:function(data) {
					
					if(data) {	
						var template = _.template(dashboardHTMl);
					}
					else {
						var template = _.template(introHTML);
					}

					self.$el.html(template(data));
					$('.login').on('click', function() {
						api.login(loadMainPageViews);
					});

					bindDashboardEvents();

				},
				error:function() {
					console.log('error')
				}
			});
		}
	});



	// helper functions //

	var bindDashboardEvents = function() {
		var addChimeForm = $('#add-chim-form');

		var finishAddChime = function() {
			$('add-chime-dropdown').click();
			console.log('loadMainPageViews')
			loadMainPageViews();
			landing.render();
		};

		$('.add-chime').on('click', function() {
			var fields = {
				"title": $('#title').val(),
				"day": $('#day').val(),
				"month": $('#month').val(),
				"description": $('#description').val()
			};

			api.addNewChime(fields, finishAddChime);
		});

		//toggle events
	  	$('.navbar-toggle-sidebar').click(function () {
	  		$('.navbar-nav').toggleClass('slide-in');
	  		$('.side-body').toggleClass('body-slide-in');
	  		$('#search').removeClass('in').addClass('collapse').slideUp(200);
	  	});

	  	$('#search-trigger').click(function () {
	  		$('.navbar-nav').removeClass('slide-in');
	  		$('.side-body').removeClass('body-slide-in');
	  		$('.search-input').focus();
	  	});


	  	//event list popup
	  	$('.info').magnificPopup({
		  type: 'inline'
		  // other options
		});

	};


	var loadMainPageViews = function() {
		if(landing) {
			console.log('destroyView')
			destroyView(landing);
			landing = new LandingPage();
		}
		else {
			landing = new LandingPage();
		}
		window.x = landing;
		landing.render();
		console.log('main page loaded');
	};


	//for removing view from DOM
	var destroyView = function(view) {

	    // COMPLETELY UNBIND THE VIEW
	    view.undelegateEvents();

	    view.$el.removeData().unbind(); 
	    view.$el.empty();

	    // Remove view from DOM
	    //view.remove();  
	    //Backbone.View.prototype.remove.call(view);

	};
	//api.login(loadMainPageViews);
	return {
		loadMainPageViews : loadMainPageViews
	}
});