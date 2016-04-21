var express = require('express');
var passport = require('passport');
var controller = require('./account.controller');
var router = express.Router();

router.get('/login', controller.getLogin);
router.post('/login', passport.authenticate('local'), controller.login);
router.get('/logout', controller.logout);
router.get('/register', controller.getRegister);
router.post('/register', controller.register);

module.exports = router;