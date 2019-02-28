const {Project} = require('../models')
const config = require('../config/config')
const jwt = require('jsonwebtoken')

module.exports = {
  async getProjects (req, res) {
    Project.findAll({ raw: true }).then(function (projects) {
            res.send(projects);
        });
  },
  
  async createProject (req, res) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.authentication.jwtSecret, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      if (decoded.role === 'Admin'){
        Project.create({
          name: req.body.name,
          companyName: req.body.companyName
        }).then(function(project) {
          res.send(project);
        });
      } else {
        res.status(403).send({
          error: 'Only admins allowed'
        })
      }
    });
  }
}
