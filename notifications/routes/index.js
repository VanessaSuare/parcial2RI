const notificationsRouter = require('./notifications.router');

function routerApi(app) {
  app.use('/api/notifications', notificationsRouter);
}

module.exports = routerApi;
