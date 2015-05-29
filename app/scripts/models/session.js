/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    '../routes/router',
], function ($, _, Backbone, Router) {
    'use strict';

    var SessionModel = Backbone.Model.extend({
        url: '/session',

        initialize: function() {
            // _.bindAll(this, 'onChange');
            // this.trigger('test');
            // console.log('Session Init');
            //Ajax Request Configuration
            //To Set The CSRF Token To Request Header
            $.ajaxSetup({
                headers : {
                'X-CSRF-Token' : csrf
                }
            });

            //Check for sessionStorage support
            if(Storage && sessionStorage){
                this.supportStorage = true;
            }
        },
        get : function(key){
            if(this.supportStorage){
                var data = sessionStorage.getItem(key);
                if(data && data[0] === '{'){
                    return JSON.parse(data);
                }else{
                    return data;
                }
            }else{
                return Backbone.Model.prototype.get.call(this, key);
            }
        },
        set : function(key, value){
            if(this.supportStorage){
                sessionStorage.setItem(key, value);
            }else{
                Backbone.Model.prototype.set.call(this, key, value);
            }
            return this;
        },
        unset : function(key){
            if(this.supportStorage){
                sessionStorage.removeItem(key);
            }else{
                Backbone.Model.prototype.unset.call(this, key);
            }
            return this;    
        },
        clear : function(){
            if(this.supportStorage){
                sessionStorage.clear();  
            }else{
                Backbone.Model.prototype.clear(this);
            }
        },
        login : function(credentials){
            // this.trigger('test');
            var that = this;
            var login = $.ajax({
                url : this.url + '/login',
                data : credentials,
                type : 'POST'
            });
            login.done(function(response){
                that.set('authenticated', true);
                that.set('user', JSON.stringify(response));

                if(that.get('redirectFrom')){
                    var path = that.get('redirectFrom');
                    that.unset('redirectFrom');
                    Backbone.history.navigate(path, { trigger : true });
                }else{
                    that.trigger('loginDone');
                    // console.log('<<<<<<<<<<< login done', response);
                    Backbone.history.navigate('', { trigger : true });
                }
            });
            login.fail(function(){
                $('#message').toggle().html('Invalid email or password');
                Backbone.history.navigate('login', { trigger : true });
            });
        },
        logout : function(callback){
            var that = this;
            $.ajax({
                url : this.url + '/logout',
                type : 'DELETE'
            }).done(function(response){
                //Clear all session data
                that.clear();
                //Set the new csrf token to csrf vaiable and
                //call initialize to update the $.ajaxSetup 
                // with new csrf
                console.log(response);
                csrf = response.csrf;
                that.initialize();
                callback();
            });
        },
        getAuth : function(callback){
            var that = this;
            var Session = this.fetch();
            // console.log('& & & & & & & & & & & & & session getAuth');
            Session.done(function(response){
                that.set('authenticated', true);
                that.set('user', JSON.stringify(response.user));
            });

            Session.fail(function(response){
                response = JSON.parse(response.responseText);
                that.clear();
                csrf = response.csrf !== csrf ? response.csrf : csrf;
                that.initialize();
            });

            Session.always(callback);
        },
        defaults: {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });
    /*And at the end we return an instance of model so we can require 
    our session model in our router, views or anywhere we need it !!*/
    return new SessionModel;
});
