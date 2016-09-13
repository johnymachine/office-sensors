'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var dataSchema = new Schema({
  sensor_id: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  },
  data: {
    type: {}
  }
}, {
  collection: 'data',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})
var Data = mongoose.model('Data', dataSchema)
module.exports = Data
