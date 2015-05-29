/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var UserModel = Backbone.Model.extend({
        urlRoot: '/users',
        idAttribute: "_id",
        initialize: function() {
        },

        defaults: {
        },

        validate: function(attrs, options) {
            var errors = this.errors = {};
            if(!attrs.email) errors.email = 'email is required';
            if(!_.isEmpty(errors)) return errors;
        },

        parse: function(response, options)  {
            return response;
        },

        signup: function (attrs) {
            // atrs = {email:email, password:password}
            var that = this;
            this.save(attrs, {
                success: function (model, res) {
                    console.log(model);
                    that.trigger('signup:success');
                },
                error: function (model, res) {
                    var error = res.responseText;
                    res.status = 401;
                    console.log(error);
                    that.validationError = {"email":error};
                    that.trigger('invalid', that);
                }
            });
        },
        save: function (attrs, options) {
            options || (options={});
            options.contentType = 'application/json';
            options.data = JSON.stringify(attrs);
            return Backbone.Model.prototype.save.call(this, attrs, options);
        }
    });

    return UserModel;
});
