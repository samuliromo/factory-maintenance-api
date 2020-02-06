const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const devices = require('./api/routes/devices.js');
const tasks = require('./api/routes/tasks.js');

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use('/devices', devices);
app.use('/tasks', tasks);

app.use((req, res, next) => {
  const error = new Error('not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
});

module.exports = app;