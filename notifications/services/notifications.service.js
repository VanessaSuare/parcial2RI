const { models } = require('../libs/sequelize');
const axios = require('axios');

const TASKS_SERVICE_URL = 'http://localhost:4000/api/tasks';
const USERS_SERVICE_URL = 'http://localhost:3000/api/users';
class NotificationsService {
  constructor() {}

  async findAll() {
    let notifications = await models.Notification.findAll();
    const taskIds = notifications.map((notification) => notification.taskId);

    const { data: tasks } = await axios.post(`${TASKS_SERVICE_URL}/idbatch`, {
      ids: taskIds,
    });

    return await Promise.all(
      notifications.map(async (notification) => {
        const task = tasks.find((task) => notification.taskId === task.id);
        notification.dataValues.task = task.description;
        const { data: user } = await axios.get(
          USERS_SERVICE_URL + '/' + notification.userId
        );
        notification.dataValues.user = user.name;
        return notification;
      })
    );
  }

  async create(notificationDTO) {
    return models.Notification.create(notificationDTO);
  }
}

module.exports = NotificationsService;
