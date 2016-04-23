var express = require('express');
var passport = require('passport');
var controller = require('./lend.controller');
var router = express.Router();

router.use(function (req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/')
    }
})

router.get('/', controller.index);
router.post('/search', controller.search);
router.post('/add', controller.add);

module.exports = router;