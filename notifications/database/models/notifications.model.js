const { Model, DataTypes, Sequelize } = require('sequelize');

const NOTIFICATION_TABLE = 'notifications';

const NotificationSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  taskId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  status: {
    allowNull: false,
    type: DataTypes.ENUM('CREATED', 'IN_PROGRESS', 'IN_REVIEW', 'FINISHED'),
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
};

class Notification extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: NOTIFICATION_TABLE,
      modelName: 'Notification',
      timestamps: false,
    };
  }
}

module.exports = { NOTIFICATION_TABLE, NotificationSchema, Notification };
