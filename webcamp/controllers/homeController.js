var uid = require('uid2');
var User = require('../models/user');
var Course = require('../models/courses/Course');
var Lesson = require('../models/courses/Lesson');
var Category = require('../models/courses/Category');
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Promise = require("bluebird");
Promise.promisifyAll(mongoose);

var home = {};

home.index = function (req, res, next) {
  Category.find().populate('courses', '-students')
  .exec(function (err, docs) {
    if (err) return next(err);
    var options = [{
        path: 'courses.lessons',
        select: 'title description',
        model: 'Lesson'
      },
      {
        path: 'courses.instructor',
        select: 'name',
        model: 'Instructor'
      }
      ];
    Category.populate(docs, options, function (err, categories) {
      var content = JSON.stringify(categories);
      res.render('index', {appData: content});
    });
  });
};

home.session = function(req, res){
  //Check for authentication
  if(req.session.user){
      res.send(200, {
          auth : true,
          user : req.session.user
      });
  }else{
      res.send(401, {
          auth : false,
          csrf : req.session.csrfSecret
      });
  }
};

home.sessionLogin = function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    req.session.user = req.user;
    return res.json(req.user);
  };

home.sessionLogout = function(req, res){
  //Sending new csrf to client when user logged out
  //for next user to sign in without refreshing the page
  req.session.user = null;
  req.session.csrfSecret = uid(24);

  res.send(200, {
      csrf : req.session.csrfSecret
  });
};

module.exports = home;