define([
	'underscore',
	'backbone'
], function(_, Backbone){
/*
BaseRouter has before and after methods and I 
rewrite the route method to call before and after methods 
before and after changing the route! 
Before has a next function as it’s second argument, 
so when we want our application let the route handler 
to get executed (like node.js middlewares) we execute next().
 */
	var BaseRouter = Backbone.Router.extend({
		before: function(){},
		after: function(){},
		route : function(route, name, callback){
			if (!_.isRegExp(route)) route = this._routeToRegExp(route);
			if (_.isFunction(name)) {
				callback = name;
				name = '';
		 	}
		  	if (!callback) callback = this[name];

		  	var router = this;

		  	Backbone.history.route(route, function(fragment) {
		   		var args = router._extractParameters(route, fragment);
		   		var next = function(){
			    	callback && callback.apply(router, args);
				    router.trigger.apply(router, ['route:' + name].concat(args));
				    router.trigger('route', name, args);
			    	// console.log('Backbone.history.trigger', 'name', name, 'args', args);
				    Backbone.history.trigger('route', router, name, args);
				    router.after.apply(router, args);		
		   		};
		   		router.before.apply(router, [args, next]);
		  	});
			return this;
		}
	});

	return BaseRouter;
});