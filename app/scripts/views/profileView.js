define([
	'core/BaseView',
	'models/session',
	'hbs!templates/profileTemplate'
], function(BaseView, Session, profileTemplate){

	var ProfileView = BaseView.extend({

		template : profileTemplate,

		events : {
			'click .logout' : 'logout'
		},

		render : function(){
			console.log(this.model.toJSON(), 'model from profile');
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		logout : function(e){
			Session.logout(function(){
				Backbone.history.navigate('', { trigger : true });
			});
		}
	});

	return ProfileView;

});