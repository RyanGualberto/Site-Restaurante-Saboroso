var express = require("express");
var router = express.Router();
var users = require('./../inc/users')

router.use(function (req, res, next) {
    if (['/login'].indexOf(req.url) === -1 && !req.session.user) {
        res.redirect('/admin/login');
    }else{
        next();
    }
});

router.get("/logout", function(req, res, next) {
    delete req.session.user;
    res.redirect('/admin/login')
});

router.get('/', function (req, res, next) {

    res.render('admin/index');
});
router.get('/reservations', function (req, res, next) {
    res.render('admin/reservations', {
        date: {}
    });
});
router.get('/login', function (req, res, next) {
    users.render(req, res, null);
});

router.post('/login', function (req, res, next) {
    if (!req.body.email) {
        users.render(req, res, "preencha o campo email");
    } else if (!req.body.password) {
        users.render(req, res, "Preencha o campo senha");
    } else {
        users.login(req.body.email, req.body.password).then(user => {
            req.session.user = user;
            res.redirect('/admin');
        }).catch(err => {
            users.render(req, res, err.message || err)
        });
    }
});
router.get('/contacts', function (req, res, next) {
    res.render('admin/contacts', {

    });
});
router.get('/emails', function (req, res, next) {
    res.render('admin/emails', {

    });
});
router.get('/users', function (req, res, next) {
    res.render('admin/users', {

    });
});
router.get('/menus', function (req, res, next) {
    res.render('admin/menus', {

    });
});

module.exports = router;