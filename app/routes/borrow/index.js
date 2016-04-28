var express = require('express');
var controller = require('./borrow.controller');
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
router.post('/remove', controller.remove);

module.exports = router;