/* All database logic and queries go in this file. 
  Postgres variables ($1, $2, etc.) are used to avoid SQL injections */

require('dotenv').config() //enables environment variables
const {Pool} = require('pg')

//use query pool so we don't have to open and close database connections for each query
//database connection details are contained in .env file
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})


//get all devices
const getAllDevices = (response) => {
  pool.query('SELECT * FROM DEVICES', (error, results) => {
    if(error) { 
      response({'error':error}); //send an error back to be shown to the end user
    } else response(results.rows); //if no error, send the result
  })
}


//add new device
const newDevice = (values, response) => {
  let {name, year, type} = values;
  pool.query('INSERT INTO DEVICES (devicename, deviceyear, devicetype) VALUES ($1, $2, $3)', 
  [name, year, type], (error, results) => {
    if(error) { 
      response({'error':error});
    } else response(results.rows);
  })
}


//get all tasks
const getAllTasks = (filter, response) => {
  let constraint = ""; //optional arguments to be inserted in the SQL query in case there are filters
  let values = [] //values to be added in case of additional query parameters
  //check if there are any filters:
  //TODO: allow multiple filters for one query
  if (filter.device) {
    constraint = 'WHERE DEVICE = $1';
    values.push(filter.device);
  }
  if (filter.devicetype) {
    constraint = 'WHERE EXISTS (SELECT * FROM DEVICES WHERE DEVICES.devicename = TASKS.device AND devicetype = $1)';
    values.push(filter.devicetype)
  }
  if (filter.description) {
    constraint = 'WHERE taskdescription LIKE $1';
    values.push(`%${filter.description}%`);
  }//order results first based on importance, then by sumbission date/time
  pool.query(`SELECT * FROM TASKS ${constraint} ORDER BY IMPORTANCE DESC, SUBMITTED DESC`, values, (error, results) => {
    if(error) { 
      response({'error':error});
    } else response(results.rows);
  })
}


//get task by id
const getTask = (id, response) => {
  pool.query('SELECT * FROM TASKS WHERE TASKID = $1', [id], (error, results) => {
    if(error) { 
      response({'error':error});
    } else response(results.rows);
  })
}



//add a new task
const newTask = (values, response) => {
  let {device, importance, description, status} = values;
  pool.query(`INSERT INTO TASKS (device, importance, taskdescription, taskstatus, submitted)
  VALUES ($1, $2, $3, $4, current_timestamp) RETURNING TASKID`, [device, importance, description, status],//return the id of newly added task
  (error, results) => {
    if(error) { 
      response({'error':error});
    } else response(results.rows);
  })
}



//update existing task
const updateTask = (id, values, response) => {
  let {device, importance, description, status} = values;
  pool.query('UPDATE TASKS SET device=$1, importance=$2, taskdescription=$3, taskstatus=$4 WHERE taskid=$5',
  [device, importance, description, status, id], (error, results) => {
    if(error) { 
      response({'error':error});
    } else response(results.rows);
  })
}


//delete existing task
const deleteTask = (id, response) => {
  pool.query('DELETE FROM TASKS WHERE TaskId = $1', [id], (error, results) => {
    if(error) { 
      response({'error':error});
    } else response({'message': `deleted task with the id of ${id}`});
  })
}


//export query functions to be used in routes
module.exports = {
  getAllDevices,
  newDevice,
  getAllTasks,
  getTask,
  newTask,
  updateTask,
  deleteTask
}