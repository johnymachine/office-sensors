'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var statusSchema = new Schema({
  sensor_id: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  },
  original_time: Number,
  sensor_rssi: Number,
  ap_rssi: Number,
  volts: Number,
  sensor_state: Number,
  delayed: Boolean
}, {
  collection: 'status',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  unique: true,
  dropDups: true
})
var Status = mongoose.model('Status', statusSchema)
module.exports = Status
