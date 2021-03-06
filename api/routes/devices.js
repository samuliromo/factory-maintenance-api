/* This file includes all the logic for routing requests related to factory devices */


const express = require('express');
const router = express.Router();
const db = require('../database.js');


//get all devices
router.get('/', (req, res) => {
  db.getAllDevices((results) => {res.status(200).json(results)});
})


//add new device
router.post('/', (req, res) => {
  let values = req.body;
  db.newDevice(values, (results) => {res.status(200).json(results)});
})



module.exports = router;