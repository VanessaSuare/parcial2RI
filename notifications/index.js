const express = require('express');
const routerApi = require('./routes');
const app = express();
const port = 5000;

app.use(express.json());
routerApi(app);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Notifications service running on port: ' + port);
});
