/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'hbs!templates/user',
    'views/signup',
    'views/login'
], function ($, _, Backbone, Handlebars, 
    userTemplate, SignupView, LoginView) {
    'use strict';

    var UserView = Backbone.View.extend({
        template: userTemplate,

        tagName: 'div',

        id: '',

        className: '',

        events: {
            'click #login':'login',
            'click #signup':'signup'
        },

        initialize: function () {
            // this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            var html = this.template();
            this.$el.html(html);
            return this;
        },

        login: function (e) {
            e.preventDefault();
            console.log('login');
            this.$el.unbind();
            this.$el.empty();
            this.$el.remove();
            var login = new LoginView();
            $('body').prepend(login.render().el);
        },
        signup: function (e) {
            e.preventDefault();
            console.log('login in LoginView');
            this.$el.unbind();
            this.$el.empty();
            this.$el.remove();
            var signup = new SignupView();
            $('body').prepend(signup.render().el);
        }
    });

    return UserView;
});
