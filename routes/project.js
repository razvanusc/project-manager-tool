var models  = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  models.Project.findAll({ raw: true }).then(function (projects) {
          res.send(projects);
      });
})

router.post('/create', function(req, res) {
  models.Project.create({
    name: req.body.name,
    companyName: req.body.companyName
  }).then(function(project) {
    res.send(project);
  });
});

module.exports = router;
