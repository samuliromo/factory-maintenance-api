/* This file includes all the logic for routing requests related to maintenance tasks */


const express = require('express');
const router = express.Router();
const db = require('../database.js');


//get all tasks, filters can be included in req.query
router.get('/', (req, res) => {
  db.getAllTasks(req.query, (results) => {res.status(200).json(results)});
})


//get a task by specific id
router.get('/:id', (req, res) => {
  let id = parseInt(req.params.id);
  db.getTask(id, (results) => {
    if (!results[0]){
      res.status(200).json({'message' : `could not find a task with the id of ${id}`})
    } 
    else res.status(200).json(results)
  });
})


//add a new task
router.post('/', (req, res) => {
  let values = req.body;
  db.newTask(values, (results) => {
    if (results.error) {
      res.status(400).json(results); //send an error if we try to add badly formatted tasks
    } else res.status(201).json({"created new task with the id:": results});
  })
})


//edit existing task by specific id
router.put('/:id', (req, res) => {
  let id = req.params.id;
  let values = req.body;
  db.updateTask(id, values, (results) => {
    res.status(200).json({"modified task with the id:": id});
  })
})


//delete existing task
router.delete('/:id', (req, res) => {
  let id = parseInt(req.params.id);
  db.deleteTask(id, (results) =>{
    res.status(200).json(results);
  })
})


//export the route
module.exports = router;