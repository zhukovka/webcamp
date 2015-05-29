define(['underscore','backbone',
  'views/modals/basemodal', 
  'views/login'],
	function (_, BackBone, BaseModal, LoginView) {
	return BaseModal.extend({
      title: "Login",
      events: {
            'click #log-in':'login',
            // 'click #signup':'signup'
      },
      login: function () {
        console.log('modal login');
        this.teardown();
        // Backbone.history.navigate('', { trigger : true });
      },
      renderModalBody: function () {
        var loginView = new LoginView({className: 'clearfix'});
        this.$("#modal-body").html(loginView.render().$el);
      },
      
		});
});
