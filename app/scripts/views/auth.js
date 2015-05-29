/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'core/BaseView',
    'models/session',
    'hbs!templates/auth',
    'views/modals/loginModal'
], function ($, _, Backbone, Handlebars, BaseView,
    Session, AuthTemplate, LoginModalView) {
    'use strict';

    var AuthView = BaseView.extend({
        template: AuthTemplate,

        tagName: 'div',

        id: '',

        className: '',

        events: {
            'click #login':'login',
            'click #modal-login':'modalLogin',
            'click #signup':'signup',
            'click #logout' : 'logOut'
        },
        logOut : function(){
            var view = this;
            Session.logout(function(){
                view.render();
            });
        },
        initialize: function () {
            this.listenTo(Session, 'loginDone', this.render);
            console.log('AUTH View Init');
            console.log(Session, 'session from home view');
        },

        render: function () {
            var user = Session.get('user');
            console.log(user, 'user from home view');
            this.$el.html(this.template({
                user : user
            }));
            return this;
        },
        modalLogin: function (e) {
            e.preventDefault();
            var loginModalView = new LoginModalView(); 
            loginModalView.show();
            // Backbone.history.navigate('modal-login', { trigger : true });
        },
        login: function (e) {
            e.preventDefault();
            console.log('login');
            Backbone.history.navigate('login', { trigger : true });
        },
        signup: function (e) {
            e.preventDefault();
            Backbone.history.navigate('signup', { trigger : true });
        }
    });

    return AuthView;
});
