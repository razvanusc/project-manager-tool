const {User} = require('../models')
const config = require('../config/config')

module.exports = {
  async getUsers (req, res) {
    User.findAll({ raw: true }).then(function (users) {
            res.send(users);
        });
  },
  async getUser (req, res) {
    User.find({
      where: {
        id: req.params.user_id
      }
    }).then(function(user) {
      res.send(user);
    });
  }
}
