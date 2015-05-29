define([
	'jquery',
	'backbone',
	'kwicks',
	'moment',
	'routes/router',
	'models/session',
	'bootstrap',
	// 'jqueryui',
	'momentlocal',
	'backbone-relational',
	'layoutmanager'
	// 'hbs',
	// 'hbshelpers',
], function($, Backbone, kwicks, moment, Router, Session){

	var ApplicationModel = Backbone.Model.extend({

		start : function(){
			Session.getAuth(function(response){
				Backbone.Layout.configure({
				  // manage: true
				});
				var router = new Router();
				// $.widget.bridge('uitooltip', $.ui.tooltip);
				moment().format();
				Backbone.history.start();
			});
		}
	});
	return ApplicationModel;
});