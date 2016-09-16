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
    var query = {}
    if (req.query.sensor_id) query.sensor_id = req.query.sensor_id
    var skip = req.query.skip || 0
    var sortby = req.query.sortby || 'timestamp'
    var order = req.query.order || 'asc'
    var limit = req.query.limit || 50
    var sort = {[sortby]: order}
    Data
      .find(query)
      .skip(skip)
      .sort(sort)
      .limit(limit)
      .exec(function (err, data) {
        if (err) {
          return res.sendStatus(500)
        } else {
          return res.status(200).json(data)
        }
      })
  })
module.exports = dataRouter
