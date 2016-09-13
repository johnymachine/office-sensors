'use strict'
var deviceRouter = require('express').Router()
var Device = require('../models/device.js')

// application router for /devices/
deviceRouter.route('/')
  // midleware for all /devices/ routes
  .all(function (req, res, next) {
    return next()
  })
  .get(function (req, res, next) {
    Device.find({}, function (err, device) {
      if (err) {
        return res.sendStatus(500)
      } else {
        return res.status(200).json(device)
      }
    })
  })
module.exports = deviceRouter
