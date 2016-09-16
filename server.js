'use strict'

//  required
var express = require('express')
var app = express()
var bodyParser = require('body-parser')

// app routers
var router = express.Router()
var cloudgateRouter = require('./routes/cloudgate.js')
var dataRouter = require('./routes/data.js')
var deviceRouter = require('./routes/device.js')
var statusRouter = require('./routes/status.js')

// mongoose
var mongoose = require('mongoose')

// set default ES6 promise library
mongoose.Promise = Promise

// set up body parser
app.use(bodyParser.json())

//  set variables from env
app.set('port', (process.env.PORT || 8080))
app.set('mongodb_uri', (process.env.MONGODB_URI))

// handle options requests
router.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Credentials', false)
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept')
  return next()
})

router.options('*', function (req, res, next) {
  return res.sendStatus(200)
})

// serve static files from
app.use('/', express.static('public'))

// bind sub routes
router.use('/cloudgate/', cloudgateRouter)
router.use('/data/', dataRouter)
router.use('/device/', deviceRouter)
router.use('/status/', statusRouter)

// bind main router and with prefix /apiv1/
app.use('/apiv1', router)

// connect to mongoDB with maximum retries
mongoose.connect(app.get('mongodb_uri'), { server: { reconnectTries: Number.MAX_VALUE } }, function (err) {
  if (err) {
    console.log('Error connecting to MongoDB: ' + err)
  } else {
    // on succesfull connection to mnogo DB, start express
    console.log('Successfully connected to MongoDB.')
    app.listen(app.get('port'))
    console.log('Server is running on port: ' + app.get('port'))
  }
})
