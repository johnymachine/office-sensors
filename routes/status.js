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
    var query = {}
    if (req.query.sensor_id) query.sensor_id = req.query.sensor_id
    var skip = req.query.skip || 0
    var sortby = req.query.sortby || 'timestamp'
    var order = req.query.order || 'asc'
    var limit = req.query.limit || 50
    var sort = {[sortby]: order}
    Status
      .find(query)
      .skip(skip)
      .sort(sort)
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
