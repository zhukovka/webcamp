define([
	'jquery',
	'core/BaseView',
	'models/session',
	'hbs!templates/loginTemplate'
], function($, BaseView, Session, loginTemplate){

	var LoginView = BaseView.extend({

		template : loginTemplate,
		
		events : {
			'click button' : 'submit'
		},

		render : function(){
			this.$el.html(this.template());
			return this;
		},

		submit : function(e){
			e.preventDefault();
			var email = $('#email').val();
			var password = $('#password').val();
			Session.login({
				email : email,
				password : password
			});
		}
	});

	return LoginView;

});