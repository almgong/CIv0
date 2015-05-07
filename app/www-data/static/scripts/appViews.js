define([
	'bb'
	], function(Backbone) {

	var appPath = "/app/www-data/";

	var LandingPage = Backbone.View.extend({
		el: $('#landing-page'),
		render:function() {
			var self = this;
			$.ajax({
				method: "GET",
				url:'/main',
				success:function(data) {
					//console.log(this.$el)
					self.$el.html(data);
				},
				error:function() {
					console.log('error')
				}
			})
		}
	});

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

	return {
		loadMainPageViews : loadMainPageViews
	}
});