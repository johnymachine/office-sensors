'use strict'
var sensorsRouter = require('express').Router();
var Sensor = require('../models/sensor.js');

// application router for /sensors/
sensorsRouter.route('/')
    // midleware for all /sensors/ routes
    .all(function (req, res, next) {
        return next();
    })
    //get all sensors
    .get(function (req, res, next) {
        return res.status(200).json({
            welcome: "Welcome to office sensors REST API!",
            url: "http://office-sensors.herokuapp.com/apiv1",
            github: "https://github.com/johnymachine/office-sensors"
        });
    })
    // create new entry for heartbeat
    .post(function (req, res, next) {
        var sensor = new Sensor({
            timestamp: req.body.timestamp,
            sensor: req.body.sensor,
            data: req.body.data,
            topic: req.body.topic
        });
        sensor.save(function (err, user) {
            if (err) {
                return res.sendStatus(500);
            } else {
                return res.status(201).json(sensor);
            }
        });
    });

module.exports = sensorsRouter;
