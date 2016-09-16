'use strict'
var deviceRouter = require('express').Router()
var Device = require('../models/device.js')
var Status = require('../models/status.js')
var Data = require('../models/data.js')

// application router for /devices/
deviceRouter.route('/')
  // all /devices/ routes
  .all(function (req, res, next) {
    return next()
  })
  // route for /device/ GET
  .get(function (req, res, next) {
    var query = {}
    if (req.query.sensor_id) query.sensor_id = req.query.sensor_id
    var skip = req.query.skip || 0
    var sortby = req.query.sortby || 'timestamp'
    var order = req.query.order || 'asc'
    var limit = req.query.limit || 50
    var sort = { [sortby]: order }
    Device
      .find(query)
      .skip(skip)
      .sort(sort)
      .limit(limit)
      .exec(function (err, device) {
        if (err) {
          return next(err)
        } else {
          return res.status(200).json(device)
        }
      })
  })

deviceRouter.param('device_id', function (req, res, next, device_id) {
  Device
    .findOne({
      'sensor_id': device_id
    })
    .exec(function (err, device) {
      if (err) {
        return next(err)
      } else if (device) {
        res.locals.device = device
        return next()
      } else {
        return res.sendStatus(404)
      }
    })
})

deviceRouter.route('/:device_id')
  // all /devices/:device_id/ routes
  .all(function (req, res, next) {
    return next()
  })
  // route for /device/:device_id/ GET
  .get(function (req, res, next) {
    return res.status(200).json(res.locals.device)
  })
  // route for /device/:device_id/ GET
  .put(function (req, res, next) {
    res.locals.device.my_name = req.body.my_name
    res.locals.device.my_description = req.body.my_description
    res.locals.device.save(function (err, device) {
      if (err) {
        return next(err)
      } else {
        return res.status(200).json(device)
      }
    })
  })

deviceRouter.route('/:device_id/status')
  // all /devices/:device_id/status routes
  .all(function (req, res, next) {
    return next()
  })
  // route for /device/:device_id/status GET
  .get(function (req, res, next) {
    Status
      .findOne({ 'sensor_id': res.locals.device.sensor_id })
      .sort({ 'timestamp': 'desc' })
      .limit(1)
      .exec(function (err, status) {
        if (err) {
          return next(err)
        } else if (status) {
          return res.status(200).json({ 'device': res.locals.device, 'last_status': status })
        } else {
          return res.sendStatus(404)
        }
      })
  })

deviceRouter.route('/:device_id/data')
  // all /devices/:device_id/data routes
  .all(function (req, res, next) {
    return next()
  })
  // route for /device/:device_id/data GET
  .get(function (req, res, next) {
    Data
      .findOne({ 'sensor_id': res.locals.device.sensor_id })
      .sort({ 'timestamp': 'desc' })
      .limit(1)
      .exec(function (err, data) {
        if (err) {
          return next(err)
        } else if (data) {
          return res.status(200).json({ 'device': res.locals.device, 'last_data': data })
        } else {
          return res.sendStatus(404)
        }
      })
  })

module.exports = deviceRouter
