const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
routerApi(app);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Users service running on port: ' + port);
});
