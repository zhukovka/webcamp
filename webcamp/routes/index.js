var express = require('express');
var router = express.Router();
var home = require('../controllers/homeController');
var passport = require('passport');

router.get('/', home.index);

router.get("/session", home.session);

router.post('/session/login', 
  passport.authenticate('local-login', { failureFlash: true }),
  home.sessionLogin);

router.delete("/session/logout", home.sessionLogout);




module.exports = router;
