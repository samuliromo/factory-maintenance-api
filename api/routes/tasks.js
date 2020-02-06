const express = require('express');
const router = express.Router();
const db = require('../database.js');


router.get('/', (req, res) => {
  db.getAllTasks(req.query, (results) => {res.status(200).json(results)});
})


router.get('/:id', (req, res) => {
  let id = parseInt(req.params.id);
  db.getTask(id, (results) => {
    if (!results[0]){
      res.status(200).json({'message' : `could not find a task with the id of ${id}`})
    } 
    else res.status(200).json(results)
  });
})


router.post('/', (req, res) => {
  let values = req.body;
  db.newTask(values, (results) => {
    if (results.error) {
      res.status(400).json(results);
    } else res.status(201).json({"created new task with the id:": results});
  })
})


router.put('/:id', (req, res) => {
  let id = req.params.id;
  let values = req.body;
  db.updateTask(id, values, (results) => {
    res.status(200).json({"modified task with the id:": id});
  })
})


router.delete('/:id', (req, res) => {
  let id = parseInt(req.params.id);
  db.deleteTask(id, (results) =>{
    res.status(200).json(results);
  })
})


module.exports = router;