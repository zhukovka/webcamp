define(['jquery', 'underscore', 'backbone',
	'views/login',
  'views/modals/loginModal',
  'views/signup',
  'views/profileView',
  'models/user',
  'models/session'], 
	function ($, _, Backbone, LoginView, 
    LoginModalView, SignupView, ProfileView, UserModel, Session) {
		return{
			showLogin : function(self){
            var loginView = new LoginView();
            // console.log(loginView, "Log in");
            self.changeView(loginView);
        },
        
        showSignup : function(){
            var signupView = new SignupView();
            // console.log(signupView, "Log in");
            self.changeView(signupView);
        },

        showProfile : function(self){
            var that = self;
            var userModel = new UserModel({
                _id : Session.get('user')._id
            });
            console.log(Session.get('user')._id, 'Session.get("user")._id from router');
            console.log(userModel, 'userModel from router');
            userModel.fetch()
                .done(function(){
                    var profileView = new ProfileView({
                        model : userModel
                    });
                    that.changeView(profileView);
                })
                .fail(function(error){
                    //In case that session expired
                    that.fetchError(error);
                });
        }
		};
	
});