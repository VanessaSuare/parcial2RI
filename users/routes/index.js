const usersRouter = require('./users.router');

function routerApi(app) {
 app.use('/api/users', usersRouter);
}

module.exports = routerApi;