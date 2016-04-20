var express = require('express');
var passport = require('passport');
var controller = require('./register.controller');
var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.register);

module.exports = router;