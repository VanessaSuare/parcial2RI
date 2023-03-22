'use strict';

const { USER_TABLE, UserSchema } = require('../models/users.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.bulkInsert(USER_TABLE, [
      {
        email: 'boss@company.com',
        role: 'BOSS',
        password: 'password',
        name: 'The Boss',
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.drop(USER_TABLE);
  },
};
