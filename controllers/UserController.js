const {User} = require('../models')
const config = require('../config/config')
const jwt = require('jsonwebtoken')

module.exports = {
  async getUsers (req, res) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.authentication.jwtSecret, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

      if (decoded.role === 'Admin') {
        User.findAll({
          where: {
            role: 'User'
          }
        }).then(function (users) {
                res.send(users);
            });
      } else {
        res.status(403).send({
          error: 'FORBIDDEN'
        })
      }
    });
  },

  async getUser (req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.authentication.jwtSecret, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      if (decoded.role === 'User'){
        User.find({
          where: {
            id: decoded.id
          }
        }).then(function(user) {
          res.send(user);
        });
      } else {
        res.status(403).send({
          error: 'Only regular users allowed'
        })
      }
    });
  }
}
