const { Model, DataTypes } = require('sequelize');

const TASK_TABLE = 'tasks';

const TaskSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.ENUM('CREATED', 'IN_PROGRESS', 'IN_REVIEW', 'FINISHED'),
    defaultValue: 'CREATED',
  },
  priority: {
    allowNull: false,
    type: DataTypes.ENUM('LOW', 'MEDIUM', 'HIGH'),
    defaultValue: 'MEDIUM',
  },
};

class Task extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TASK_TABLE,
      modelName: 'Task',
      timestamps: false,
    };
  }
}

module.exports = { TASK_TABLE, TaskSchema, Task };
