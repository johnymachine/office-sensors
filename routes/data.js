'use strict'
var dataRouter = require('express').Router()
var Data = require('../models/data.js')

// application router for /sensors/
dataRouter.route('/')
  // midleware for all /sensors/ routes
  .all(function (req, res, next) {
    return next()
  })
  // parse new heartbeat
  .get(function (req, res, next) {
    Data.find({ 'sensor_id': 88795 }, function (err, data) {
      if (err) {
        return res.sendStatus(500)
      } else {
        return res.status(200).json(data)
      }
    })
  })
module.exports = dataRouter
