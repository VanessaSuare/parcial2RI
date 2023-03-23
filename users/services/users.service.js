const { where } = require('sequelize');
const { models } = require('../libs/sequelize');

class UsersService {
  constructor() {}

  findAll(role) {
    // Validación del rol del usuario
    return models.User.findAll({ where: { role: role } });
  }

  async create(userDTO) {
    const reqUser = await this.findById(userDTO.requestUser);
    if (reqUser.role === 'BOSS') {
      const { requestUser, ...insertData } = userDTO;
      return models.User.findOrCreate({
        where: { email: userDTO.email },
        defaults: insertData,
      });
    } else {
      return false;
    }
  }

  findById(id) {
    //Encontrar usuario por su id
    return models.User.findByPk(id);
  }

  async update(id, changes) {
    //Crear usuario
    const user = await this.findById(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findById(id);
    await user.destroy();
    return { id };
  }

  async validate(username, password) {
    return await models.User.findOne({
      where: { email: username, password },
    });
  }
}

module.exports = UsersService;
