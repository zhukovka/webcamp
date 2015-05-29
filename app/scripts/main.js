/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
          exports: '_'
        },
        backbone: {
          deps: ['underscore', 'jquery'],
          exports: 'Backbone'
        },
        'backbone-relational' : ['backbone'],
        handlebars: {
          exports: 'Handlebars'
        },
        // jqueryui: ['jquery'],
        bootstrap: ['jquery'],
        kwicks: {
            deps: ['jquery'],
        },
        
        moment: {
            noGlobal: true
        },

        // hbshelpers:['handlebars'],
        facebook : {
            exports: 'FB'
        },
        linkedin: {
            exports: 'IN'
        }
    },
    paths: {
        underscore: '../bower_components/lodash/dist/lodash',
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        'backbone-relational':'../bower_components/backbone-relational/backbone-relational',
        layoutmanager:'../bower_components/layoutmanager/backbone.layoutmanager',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
        // jqueryui: './vendor/jquery-ui-1.11.1/jquery-ui',
        kwicks: './vendor/kwicks/jquery.kwicks',
        moment: "../bower_components/moment/moment",
        momentlocal: "../bower_components/moment/locale/ru",
        hbs: '../bower_components/require-handlebars-plugin/hbs',
        handlebars: '../bower_components/handlebars/handlebars',
        // hbshelpers: '../bower_components/assemble-handlebars-helpers/index',
        'facebook': '//connect.facebook.net/en_GB/all',
        'linkedin': '//platform.linkedin.com/in',
        
        utils: './vendor/utils'

    },
    hbs: { // optional
        helpers: true,            // default: true
        i18n: false,              // default: false
        templateExtension: 'hbs', // default: 'hbs'
        partialsUrl: 'templates/' // default: ''
    },
    
    
});

require([
    'app', 'fb'
], function (App) {
    $(function() {
        var app = new App();
        app.start(); 
        // $('body').append('<script src="//platform.linkedin.com/in.js" type="text/javascript"></script>');

    });
});
