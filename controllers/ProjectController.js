const {Project} = require('../models')
const config = require('../config/config')

module.exports = {
  async getProjects (req, res) {
    Project.findAll({ raw: true }).then(function (projects) {
            res.send(projects);
        });
  },
  async createProject (req, res) {
    Project.create({
      name: req.body.name,
      companyName: req.body.companyName
    }).then(function(project) {
      res.send(project);
    });
  }
}
