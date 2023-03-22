const { models } = require('../libs/sequelize');
const axios = require('axios');
const { where } = require('sequelize');

const USERS_SERVICE_URL = 'http://localhost:3000/api/users';
const NOTIFICATIONS_SERVICE_URL = 'http://localhost:5000/api/notifications';
class TasksService {
  constructor() {}

  findAll(userId) {
    if (userId) {
      return models.Task.findAll({ where: { userId } });
    } else {
      return models.Task.findAll();
    }
  }

  async create(taskDTO, requestUserId) {
    const { data: user } = await axios.get(
      `${USERS_SERVICE_URL}/${requestUserId}`
    );
    if (user && user.role === 'BOSS') {
      const task = await models.Task.create(taskDTO);
      await axios.post(NOTIFICATIONS_SERVICE_URL, {
        userId: task.userId,
        taskId: task.id,
        status: task.status,
      });
      return task;
    }
    return false;
  }

  async updateStatus(taskId, status) {
    const task = await models.Task.findByPk(taskId);
    task.status = status;
    await models.Task.update({ status }, { where: { id: taskId } });
    await axios.post(NOTIFICATIONS_SERVICE_URL, {
      userId: task.userId,
      taskId: task.id,
      status: status,
    });
    return true;
  }

  findManyByIds(taskIds) {
    return models.Task.findAll({ where: { id: taskIds } });
  }
}

module.exports = TasksService;
