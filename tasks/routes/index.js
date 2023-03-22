const tasksRouter = require("./tasks.router");

function routerApi(app) {
  app.use("/api/tasks", tasksRouter);
}

module.exports = routerApi;
