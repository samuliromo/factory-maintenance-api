const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const devices = require('./api/routes/devices.js');
const tasks = require('./api/routes/tasks.js');

//add body parser so we can parse JSON
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
//add routes
app.use('/devices', devices);
app.use('/tasks', tasks);

//handle url errors
app.use((req, res, next) => {
  const error = new Error('not found');
  error.status = 404;
  console.log('virhe 1')
  res.json({"error": error.message})
});

module.exports = app;