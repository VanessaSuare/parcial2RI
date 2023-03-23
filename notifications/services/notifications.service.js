const { models } = require('../libs/sequelize');
const axios = require('axios');

const TASKS_SERVICE_URL = 'http://192.168.100.2:4000/api/tasks';
const USERS_SERVICE_URL = 'http://192.168.100.2:3000/api/users';
class NotificationsService {
  constructor() {}

  async findAll() {
    //Traer todas las notificaciones
    let notifications = await models.Notification.findAll(); // Obtener todos los taskIDs de cada notificacion
    const taskIds = notifications.map((notification) => notification.taskId); // [1,2,3,4,7]
    //Consultar las tareas por el arreglo de tasksIDs
    const { data: tasks } = await axios.post(`${TASKS_SERVICE_URL}/idbatch`, {
      ids: taskIds, //Devuelve un arreglo de tareas
    });

    return await Promise.all(
      //Recorrer las notificaciones
      notifications.map(async (notification) => {
        //Buscar tarea asociada a la notificacion
        const task = tasks.find((task) => notification.taskId === task.id);
        //Agregar desripcion de tarea a la notificacion
        notification.dataValues.task = task.description;

        //Consultar usuario por id a servicio de usuarios
        const { data: user } = await axios.get(
          // Devuelve un usuario por su id
          USERS_SERVICE_URL + '/' + notification.userId
        );

        //Agregar nombre de usuario a notificacion
        notification.dataValues.user = user.name;

        return notification;
      })
    );
  }

  //Crear notificación
  async create(notificationDTO) {
    //retorna la notificacion con el modelo
    return models.Notification.create(notificationDTO);
  }
}

module.exports = NotificationsService;
