/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'hbs!templates/signup',
    'models/user',
    'models/session',
    'core/BaseView'
], function ($, _, Backbone, Handlebars, SignupTemplate, UserModel, Session, BaseView) {
    'use strict';

    var SignupView = BaseView.extend({
        template: SignupTemplate,

        tagName: 'div',

        id: '',

        className: '',

        events: {
            'click #signup':'signup'
        },

        initialize: function () {
            // this.listenTo(this.model, 'change', this.render);
            this.user = new UserModel();
            this.listenTo(this.user, 'invalid', this.renderError);
            this.listenTo(this.user, 'signup:success', this.goProfile);
        },

        render: function () {
            var html = this.template();
            this.$el.html(html);
            console.log(this);
            return this;
        },

        signup: function (e) {
            e.preventDefault();
            console.log('Signup');
            var email = $('input[name=email]').val();
            console.log(email, "email SignupView");
            var password = $('input[name=password]').val();
            this.user.clear();
            this.user.signup({email:email, password:password});
            console.log(this);
        },
        renderError: function (err, options) {
            var errors = _.map(_.keys(err.validationError), function (key) {
                return err.validationError[key];
            });
            this.$('#error').toggle().text(errors);
        },
        goProfile: function () {
            console.log(this.user.get('email'), 'goProfile email');
            Session.login({
                email : this.user.get('email'),
                password : this.user.get('password')
            });
            // e.preventDefault();
            Backbone.history.navigate('profile', {trigger:true});
        }
    });

    return SignupView;
});
