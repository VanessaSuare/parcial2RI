const { models } = require('../libs/sequelize');
const axios = require('axios');

const USERS_SERVICE_URL = 'http://tasksmanager:3000/api/users';
const NOTIFICATIONS_SERVICE_URL = 'http://tasksmanager:5000/api/notifications';
class TasksService {
  constructor() {}

  async findAll(userId) {
    //Si viene userId
    if (userId) {
      //Buscar todas las tareas asignadas a ese userId
      return models.Task.findAll({ where: { userId } });
    } else {
      //Sino, buscar todas las tareas
      const tasks = await models.Task.findAll();
      return Promise.all(
        //Recorrer todas las tareas
        tasks.map(async (task) => {
          //Obtener info de usuario asignado a tarea
          const { data: user } = await axios.get(
            `${USERS_SERVICE_URL}/${task.userId}`
          );
          //Añadir usuario a objeto tarea de respuesta
          task.dataValues.user = user;
          return task;
        })
      );
    }
  }

  async create(taskDTO, requestUserId) {
    //Buscar info de usuario que envia la peticion
    const { data: user } = await axios.get(
      `${USERS_SERVICE_URL}/${requestUserId}`
    );
    //Validar que el usuario de la peticion sea Jefe
    if (user && user.role === 'BOSS') {
      //Crear tarea
      const task = await models.Task.create(taskDTO);
      //Llamar microservicio de notificaciones para crear notificacion
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
    //Buscar tarea a actualizar estado
    const task = await models.Task.findByPk(taskId);
    //Asignar nuevo estado a tarea
    task.status = status;
    //Actualizar tarea en la BD
    await models.Task.update({ status }, { where: { id: taskId } });
    //Llamar microservicio de notificaciones para crear notificacion con nuevo estado
    await axios.post(NOTIFICATIONS_SERVICE_URL, {
      userId: task.userId,
      taskId: task.id,
      status: status,
    });
    return true;
  }

  findManyByIds(taskIds) {
    //Buscar tareas por varios IDs
    return models.Task.findAll({ where: { id: taskIds } });
  }
}

module.exports = TasksService;
