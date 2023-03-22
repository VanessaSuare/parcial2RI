const { models } = require('../libs/sequelize');

class UsersService {
  constructor() {}

  findAll() {
    return models.User.findAll();
  }

  async create(userDTO) {
    const reqUser = await this.findById(userDTO.requestUser);
    if (reqUser.role === 'BOSS') {
      return models.User.findOrCreate({
        where: { email: userDTO.email },
        defaults: userDTO,
      });
    } else {
      return false;
    }
  }

  findById(id) {
    return models.User.findByPk(id);
  }

  async update(id, changes) {
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
