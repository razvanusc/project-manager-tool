var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
  models.User.findAll({ raw: true }).then(function (users) {
          res.send(users);
      });
})

router.get('/:user_id', function(req, res) {
  models.User.find({
    where: {
      id: req.params.user_id
    }
  }).then(function(user) {
    res.send(user);
  });
});

router.post('/create', function(req, res) {
  models.User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  }).then(function(user) {
    res.send(user);
  });
});

module.exports = router;
