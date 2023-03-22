const USER = 'root';
const PASSWORD = 'password';
module.exports = {
  development: {
    username: USER,
    password: PASSWORD,
    database: 'taskmanager',
    dialect: 'mariadb',
  },
  production: {
    username: USER,
    password: PASSWORD,
    database: 'taskmanager',
    dialect: 'mariadb',
  },
};
