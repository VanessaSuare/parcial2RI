const { Notification, NotificationSchema } = require('./notifications.model');

function setupModels(sequelize) {
  Notification.init(NotificationSchema, Notification.config(sequelize));
}

module.exports = setupModels;
