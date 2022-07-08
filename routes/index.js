var conn = require('./../inc/db');
var express = require('express');
var menus = require('./../inc/menus');
var reservations = require('./../inc/reservations')
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  menus.getMenus().then(results => {
    res.render('index', {
      title: 'Restaurante Saboroso!',
      menus: results,
      isHome: true
    })
  });
});

router.get('/contacts', function (req, res, next) {

  res.render('contacts', {
    title: 'Contato - Restaurante Saboroso!',
    background: 'images/img_bg_3.jpg',
    h1: 'Diga Um Oi!'
  });
});

router.get('/menus', function (req, res, next) {
  menus.getMenus().then(results => {
    res.render('menus', {
      title: 'Menu - Restaurante Saboroso!',
      background: 'images/img_bg_1.jpg',
      h1: 'Saboreie Nosso Menu!',
      menus: results
    });
  });
});

router.get('/services', function (req, res, next) {
  res.render('services', {
    title: 'Serviços - Restaurante Saboroso!',
    background: 'images/img_bg_1.jpg',
    h1: 'É um prazer poder servir!'
  });
});

router.get('/reservations', function (req, res, next) {
  reservations.render(req, res)
  res.render('reservations', {
    title: 'Reservas - Restaurante Saboroso!',
    background: 'images/img_bg_2.jpg',
    h1: 'Reserve uma Mesa!'
  });
});

router.post('/reservations', function (req, res, next) {
  if (!req.body.name) {
    reservations.render(req, res, 'digite um nome');
  } else if (!req.body.email) {
    reservations.render(req, res, 'digite um email');
  } else if (!req.body.people) {
    reservations.render(req, res, 'Selecione a Quantidade de Pessoas');
  } else if (!req.body.date) {
    reservations.render(req, res, 'escolha um data');
  } else if (!req.body.time) {
    reservations.render(req, res, 'selecione a hora');
  } else {
    reservations.save(req.body).then(results => {
      req.body = {};
      reservations.render(req, res, null, "reserva realizada com sucesso!");

    }).catch(err => {
      reservations.render(req, res, err.message);
    });
  }
});
module.exports = router;
