const { models } = require('../libs/sequelize');
const axios = require('axios');

const USERS_SERVICE_URL = 'http://localhost:3000/api/users';
class TasksService {
  constructor() {}

  findAll(userId) {
    if (userId) {
      return models.Task.findAll({ where: { userId } });
    } else {
      return models.Task.findAll();
    }
  }

  async create(taskDTO) {
    const { data: user } = await axios.get(
      `${USERS_SERVICE_URL}/${taskDTO.userId}`
    );
    if (user && user.role === 'BOSS') {
      // ToDo: Generar notificacion
      return models.Task.create(taskDTO);
    }
    return false;
  }

  async updateStatus(taskId, status) {
    const task = await models.Task.findByPk(taskId);
    task.status = status;
    await models.Task.update({ status }, { where: { id: taskId } });
    // ToDo: Generar notificacion
    return true;
  }
}

module.exports = TasksService;
