define([
	'bb',
	'apiClient',
	'text!../templates/main_dashboard.template.html',
	'text!../templates/main_intro.template.html'
	], function(Backbone, api, dashboardHTMl, introHTML) {

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
		$('.add-chime').on('click', function() {
			var fields = {
				"title": $('#title').val(),
				"time": $('#time').val(),
				"description": $('#description').val()
			};

			api.addNewChime(fields);
		});
	};


	var loadMainPageViews = function() {
		if(landing) {
			console.log('destroyView')
			destroyView(landing);
			var landing = new LandingPage();
		}
		else {
			var landing = new LandingPage();
		}

		landing.render();
		console.log('main page loaded');
	};


	//for removing view from DOM
	var destroyView = function(view) {

	    // COMPLETELY UNBIND THE VIEW
	    view.undelegateEvents();

	    view.$el.removeData().unbind(); 

	    // Remove view from DOM
	    view.remove();  
	    Backbone.View.prototype.remove.call(view);

	};
	//api.login(loadMainPageViews);
	return {
		loadMainPageViews : loadMainPageViews
	}
});