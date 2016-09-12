'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var sensorSchema = new Schema({
    timestamp: {
        type: Date,
        required: true
    },
    sensor: {
        "id": Number,
        "original_time": Number,
        "type_name": String,
        "sensor_rssi": Number,
        "ap_rssi": Number,
        "volts": Number,
        "sensor_state": Number,
        "delayed": Boolean,
        "type_number": Number
    },
    data: {
        type: {}
    },
    topic: String
});
var Sensor = mongoose.model('Sensor', sensorSchema);
module.exports = Sensor;
