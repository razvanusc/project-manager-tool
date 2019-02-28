'use strict';
const { User } = require('../models')

module.exports = {
  up : function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      username: 'admin',
      password: 'admin',
      firstName: 'Admin',
      lastName: 'User',
      role: "Admin"
    }], {});
  },

  down : function (queryInterface, Sequelize) {
    queryInterface.bulkDelete('Users', [{
      username: 'admin'
    }])
  }
};
