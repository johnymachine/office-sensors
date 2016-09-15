'use strict'
var statusRouter = require('express').Router()
var Status = require('../models/status.js')

// application router for /status/
statusRouter.route('/')
  // midleware for all /status/ routes
  .all(function (req, res, next) {
    return next()
  })
  // get sensor status
  .get(function (req, res, next) {
    var sensorId = req.query.sensor_id || ''
    var skip = req.query.skip || 0
    var order = req.query.order || 'asc'
    var limit = req.query.limit || 100
    Status
      .find({ 'sensor_id': sensorId })
      .skip(skip)
      .sort({ 'timestamp': order })
      .limit(limit)
      .exec(function (err, status) {
        if (err) {
          return res.sendStatus(500)
        } else {
          return res.status(200).json(status)
        }
      })
  })
module.exports = statusRouter
