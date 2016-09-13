'use strict'
var dataRouter = require('express').Router()
var Data = require('../models/data.js')

// application router for /data/
dataRouter.route('/')
  // midleware for all /data/ routes
  .all(function (req, res, next) {
    return next()
  })
  // get sensor data
  .get(function (req, res, next) {
    var sensorId = req.query.sensor_id
    Data.find({ 'sensor_id': sensorId }, function (err, data) {
      if (err) {
        return res.sendStatus(500)
      } else {
        return res.status(200).json(data)
      }
    })
  })
module.exports = dataRouter
