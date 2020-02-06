const {Pool} = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'MORE',
  password: 'mastersamuli',
  port: 5432,
})


const getAllDevices = (response) => {
  pool.query('SELECT * FROM DEVICES', (error, results) => {
    if(error) { 
      response({'error':error});
    } else response(results.rows);
  })
}


const newDevice = (values, response) => {
  let {name, year, type} = values;
  pool.query('INSERT INTO DEVICES (devicename, deviceyear, devicetype) VALUES ($1, $2, $3)', 
  [name, year, type], (error, results) => {
    if(error) { 
      response({'error':error});
    } else response(results.rows);
  })
}


const getAllTasks = (filter, response) => {
  let constraint = "";
  let values = []
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
  }
  pool.query(`SELECT * FROM TASKS ${constraint} ORDER BY IMPORTANCE DESC, SUBMITTED DESC`, values, (error, results) => {
    if(error) { 
      response({'error':error});
    } else response(results.rows);
  })
}


const getTask = (id, response) => {
  pool.query('SELECT * FROM TASKS WHERE TASKID = $1', [id], (error, results) => {
    if(error) { 
      response({'error':error});
    } else response(results.rows);
  })
}


const newTask = (values, response) => {
  let {device, importance, description, status} = values;
  pool.query(`INSERT INTO TASKS (device, importance, taskdescription, taskstatus, submitted)
  VALUES ($1, $2, $3, $4, current_timestamp) RETURNING TASKID`, [device, importance, description, status],
  (error, results) => {
    if(error) { 
      response({'error':error});
    } else response(results.rows);
  })
}


const updateTask = (values, response) => {
  let {device, importance, description, status} = values;
  pool.query('UPDATE TASKS SET device=$1, importance=$2, taskdescription=$3, taskstatus=$4' ,
  [device, importance, description, status], (error, results) => {
    if(error) { 
      response({'error':error});
    } else response(results.rows);
  })
}


const deleteTask = (id, response) => {
  pool.query('DELETE FROM TASKS WHERE TaskId = $1', [id], (error, results) => {
    if(error) { 
      response({'error':error});
    } else response(results.rows);
  })
}


module.exports = {
  getAllDevices,
  newDevice,
  getAllTasks,
  getTask,
  newTask,
  updateTask,
  deleteTask
}