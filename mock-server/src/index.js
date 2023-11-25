const express = require('express');
const bodyParser = require('body-parser');
require('express-async-errors');

const routes = require('./routes');
const app = express();
const port = 3001;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(bodyParser.json());
app.use(routes);

app.listen(port, () => {
  console.log(`CMS mock API listening on port ${port}`);
});

