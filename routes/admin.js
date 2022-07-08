var express = require("express");
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('admin/index', {

    });
});
router.get('/reservations', function(req, res, next) {
    res.render('admin/reservations', {
        date: {}
    });
});
router.get('/login', function(req, res, next) {
    res.render('admin/login', {

    });
});
router.get('/contacts', function(req, res, next) {
    res.render('admin/contacts', {

    });
});
router.get('/emails', function(req, res, next) {
    res.render('admin/emails', {

    });
});
router.get('/users', function(req, res, next) {
    res.render('admin/users', {

    });
});

module.exports = router;