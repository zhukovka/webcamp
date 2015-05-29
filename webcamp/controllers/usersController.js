var users = {};
var User = require('../models/user');
var passport = require('passport');

users.index = function (req, res) {
	console.log(req, 'req');
	User.find(function (err, users) {
		// body...
		if (err) throw err;
		res.json(users);
	});
};

users.login = function (req, res) {
	console.log(req.user);
	res.json(req.user);
};

// users.signup = function (req, res) {
// 	console.log(req.headers);
// 	res.json(req.user);
// };

// users.login = function(req, res) {
// 	// render the page and pass in any flash data if it exists
// 	// res.render('login.ejs', { message: req.flash('loginMessage') }); 
// };

users.signup = function(req, res, next) {
  passport.authenticate('local-signup', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { 
    	console.log(res.req.session);
    	return res.status(401).end(res.req.session.flash.signupMessage[0]); 
    }
    req.logIn(user, function(err) {
    	console.log(res.req.session);
      if (err) { return next(err); }
      return res.json(user);
    });
  })(req, res, next);
};

users.getById = function (req, res, next) {
	console.log(req.params);
	User.findOne({_id: req.params.id}, function (err, user) {
		// body...
		if (err) return next(err);
		if(user){
			return res.json(user);
		}
		return res.send(400);
	});
};

/* ------------------------------------------------
 Route Filters
   ------------------------------------------------*/

//Authentication Filter
users.Auth = function(req, res, next) {
  if(req.session.user){
      next();
  }else{
      res.send(401, {
          flash : 'Plase log in first'
      });
  }
};

module.exports = users;