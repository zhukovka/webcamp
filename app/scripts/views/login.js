/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'core/BaseView',
    'models/session',
    'hbs!templates/login',
    'views/signup'
], function ($, _, Backbone, Handlebars, BaseView, Session, LoginTemplate, SignupView) {
    'use strict';

    var LoginView = BaseView.extend({
        template: LoginTemplate,

        tagName: 'div',

        id: '',

        className: 'container',

        events: {
            'click #log-in':'login',
            // 'click #signup':'signup'
        },

        initialize: function () {
            // this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            console.log(this, "LOIGN render");
            var html = this.template();
            this.$el.html(html);
            return this;
        },
        login: function (e) {
            e.preventDefault();
            console.log('GO!!!');
            var email = $('#email').val();
            var password = $('#password').val();
            Session.login({
                email : email,
                password : password
            });
        },
        signup: function (e) {
            e.preventDefault();
            console.log('login in LoginView');
            this.$el.unbind();
            this.$el.empty();
            this.$el.remove();
            var signup = new SignupView();
            // $('#app').empty();
            $('#app').append(signup.render().el);
        }
    });

    return LoginView;
});
