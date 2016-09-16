'use strict'
var cloudgateRouter = require('express').Router()
var Device = require('../models/device.js')
var Status = require('../models/status.js')
var Data = require('../models/data.js')

// application router for /sensors/
cloudgateRouter.route('/')
  // all /sensors/ routes
  .all(function (req, res, next) {
    return next()
  })
  // parse new heartbeat request
  .post(function (req, res, next) {
    var sensorId = req.body.sensor.id
    var timestamp = new Date(req.body.timestamp * 1000)

    var newData = new Data({
      sensor_id: sensorId,
      timestamp: timestamp,
      original_time: req.body.sensor.original_time,
      data: req.body.data
    })

    var newStatus = new Status({
      sensor_id: sensorId,
      timestamp: timestamp,
      original_time: req.body.sensor.original_time,
      sensor_rssi: req.body.sensor.sensor_rssi,
      ap_rssi: req.body.sensor.ap_rssi,
      volts: req.body.sensor.volts,
      sensor_state: req.body.sensor_state,
      delayed: req.body.sensor.delayed
    })
    Device.findOne({ 'sensor_id': sensorId }, function (err, device) {
      if (err) {
        return res.sendStatus(500)
      } else if (device) {
        newStatus.save(function (err, status) {
          if (err) {
            return res.sendStatus(500)
          } else {
            newData.save(function (err, data) {
              if (err) {
                console.log(err)
                return res.sendStatus(500)
              } else {
                return res.sendStatus(200)
              }
            })
          }
        })
      } else {
        var newDevice = new Device({
          sensor_id: sensorId,
          type_name: req.body.sensor.type_name,
          type_number: req.body.sensor.type_number,
          my_name: req.body.sensor.type_name
        })
        newDevice.save(function (err, device) {
          if (err) {
            return res.sendStatus(500)
          } else {
            newStatus.save(function (err, status) {
              if (err) {
                return res.sendStatus(500)
              } else {
                newData.save(function (err, data) {
                  if (err) {
                    return res.sendStatus(500)
                  } else {
                    return res.sendStatus(200)
                  }
                })
              }
            })
          }
        })
      }
    })
  })
module.exports = cloudgateRouter
