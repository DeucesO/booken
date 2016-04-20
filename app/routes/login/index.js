var express = require('express');
var passport = require('passport');
var controller = require('./login.controller');
var router = express.Router();

router.get('/', controller.index);
router.post('/', passport.authenticate('local'), controller.login);
router.get('/logout', controller.logout);

module.exports = router;