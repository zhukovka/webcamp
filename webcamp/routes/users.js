var express = require('express');
var router = express.Router();
var passport = require('passport');
var users = require('../controllers/usersController.js');
/* GET users listing. */
router.get('/', users.index);
router.get('/:id', users.Auth, users.getById);

// router.get('/login', users.login);

// router.post('/', passport.authenticate('local-signup', { failureFlash: 'Invalid username or password.' }), users.signup);
router.post('/', users.signup);
module.exports = router;
