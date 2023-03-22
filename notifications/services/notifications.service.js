const { models } = require('../libs/sequelize');
const axios = require('axios');

const TASKS_SERVICE_URL = 'http://localhost:4000/api/tasks';
class NotificationsService {
  constructor() {}

  async findAll(userId) {
    let notifications = await models.Notification.findAll({
      where: { userId },
    });
    const taskIds = notifications.map((notification) => notification.taskId);
    const { data: tasks } = await axios.post(`${TASKS_SERVICE_URL}/idbatch`, {
      ids: taskIds,
    });
    return notifications.map((notification) => {
      const task = tasks.find((task) => notification.taskId === task.id);
      notification.dataValues.task = task;
      return notification;
    });
  }

  async create(notificationDTO) {
    return models.Notification.create(notificationDTO);
  }
}

module.exports = NotificationsService;
