const express = require('express');
const router = express.Router();
const db = require('../database.js');

router.get('/', (req, res) => {
  db.getAllDevices((results) => {res.status(200).json(results)});
})

router.post('/', (req, res) => {
  let values = req.body;
  db.newDevice(values, (results) => {res.status(200).json(results)});
})

module.exports = router;