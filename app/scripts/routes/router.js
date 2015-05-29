/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'core/baseRouter',
    'routes/CategoryController',
    'routes/StudentController',
    'routes/WebcampController',
    'routes/UserController',
    'collections/Categories',
    'views/navs/NavbarsLayoutView',
    'models/session'
], function($, _,  Backbone, BaseRouter, CategoryController, 
    StudentController, WebcampController, UserController, 
    CategoriesCollection, NavbarsLayoutView, Session){

    var Router = BaseRouter.extend({

        routes : {
            '' : 'showHome',
            'courses' : 'showAllCourses',
            'schedule' : 'showSсhedule',
            'instructors' : 'showInsrtuctors',
            'reviews' : 'showReviews',
            'about' : 'showAbout',
            'contact' : 'showContact',
            'login' : 'showLogin',
            'signup' : 'showSignup',
            'profile' : 'showProfile',
            // 'modal-login':'showModalLogin',
            'confirm/:id':'confirm',
            ':title':'showCategory',
            ':title/:course':'showCourseDetails',
        },

        // Routes that need authentication and if user is not 
        // authenticated
        // gets redirect to login page
        requrestAuth : ['#profile'],

        // Routes that should not be accessible if user is authenticated
        // for example, login, register, forgetpasword ...
        preventAccessWhenAuth : ['#login'],

        before : function(params, next){
            //Checking if user is authenticated or not
            //then check the path if the path requires authentication 
            var isAuth = Session.get('authenticated');
            var path = Backbone.history.location.hash;
            var needAuth = _.contains(this.requrestAuth, path);
            var cancelAccess = _.contains(this.preventAccessWhenAuth, path);
            console.log("* * * * * * * * * * * BEFORE");
            if(needAuth && !isAuth){
                //If user gets redirect to login because wanted to access
                // to a route that requires login, save the path in session
                // to redirect the user back to path after successful login
                Session.set('redirectFrom', path);
                Backbone.history.navigate('login', { trigger : true });
            }else if(isAuth && cancelAccess){
                //User is authenticated and tries to go to login, register ...
                // so redirect the user to home page
                Backbone.history.navigate('', { trigger : true });
            }else{
                //No problem handle the route
                console.log('=========>>>>> No problem');
                return next();
            }           
        },

        after : function(){
            //empty
        },

        changeView : function(view){
            //Close is a method in BaseView
            //that check for childViews and 
            //close them before closing the 
            //parentView
            function setView(view){
                if(this.currentView){
                    // console.log(this);
                    this.currentView.close();
                }
                this.currentView = view;
                $('#app').html(view.render().$el);

            }

            setView(view);
        },

        showLogin : function(){
            UserController.showLogin(this);
        },
        
        showSignup : function(){
            UserController.showSignup(this);
        },

        showProfile : function(){
            UserController.showProfile(this);
        },

        showHome : function(){
            CategoryController.showHome(this);
        },
        showSсhedule: function () {
            console.log('Show schedule');
            CategoryController.showSсhedule(this);
        },
        showInsrtuctors: function () {
            
            CategoryController.showInsrtuctors(this);
        },
        showReviews: function () {
            CategoryController.showReviews(this);
        },
        showCategory:function (title) {
            console.log(title, 'Show category');
            CategoryController.showCategory(this, title);
        },
        showAllCourses: function () {
            CategoryController.showAllCourses(this);
        },
        showAbout: function () {
            WebcampController.showAbout(this);
        },
        showContact: function () {
            WebcampController.showContact(this);
        },

        showCourseDetails:function (title, course) {
            CategoryController.showCourseDetails(this, title, course);
        },
        showNavbar : function () {
            if(!this.navbarView){
                this.navbarView = new NavbarsLayoutView();
                $('body').prepend(this.navbarView.render().$el);
            }
        },
        confirm: function (id) {
            StudentController.confirm(this, id);
        },
        fetchError : function(error){
            //If during fetching data from server, session expired
            // and server send 401, call getAuth to get the new CSRF
            // and reset the session settings and then redirect the user
            // to login
            if(error.status === 401){
                Session.getAuth(function(){
                    Backbone.history.navigate('login', { trigger : true });
                });
            }
        },
        _setupCollection: function() {
          if(this.collection) return;
          var data = $("#data").html();
          this.collection = new CategoriesCollection(JSON.parse(data));
        },
        initialize: function () {
            this.showNavbar();
            this._setupCollection();
        }

    });

    return Router;
});
