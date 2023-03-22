'use strict';

const {
  NOTIFICATION_TABLE,
  NotificationSchema,
} = require('../models/notifications.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(NOTIFICATION_TABLE, NotificationSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(NOTIFICATION_TABLE);
  },
};
