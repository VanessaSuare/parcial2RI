const { Task, TaskSchema } = require("./tasks.model");

function setupModels(sequelize) {
  Task.init(TaskSchema, Task.config(sequelize));
}

module.exports = setupModels;
