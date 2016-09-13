'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var deviceSchema = new Schema({
  sensor_id: {
    type: Number,
    index: true,
    unique: true,
    required: true,
    dropDups: true
  },
  type_name: String,
  type_number: Number,
  my_name: String,
  my_description: {
    type: String,
    default: ''
  }
}, {
  collection: 'devices',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})
var Device = mongoose.model('Device', deviceSchema)
module.exports = Device
