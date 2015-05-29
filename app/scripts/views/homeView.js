define([
	'core/BaseView',
	'models/session',
	'hbs!templates/home',
], function(BaseView, Session, homeTemplate){

	var HomeView = BaseView.extend({

		template : homeTemplate,

		events : {
			'click .logout' : 'logOut'
		},

		logOut : function(){
			var view = this;
			Session.logout(function(){
				view.render();
			});
		},

		render : function(){
			console.log(Session, 'session from home view');
			var user = Session.get('user');
			console.log(user, 'user from home view');
			this.$el.html(this.template({
				user : user
			}));
			return this;
		}
	});

	return HomeView;

});