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

// mongoose
var mongoose = require('mongoose')

// set default ES-6 promise library
mongoose.Promise = Promise

// set up body parser
app.use(bodyParser.json())

//  env vars
app.set('port', (process.env.PORT || 8080))
app.set('mongodb_uri', (process.env.MONGODB_URI))

// handle options requests
router.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Credentials', false)
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, appKey')
  return next()
})

router.options('*', function (req, res) {
  return res.sendStatus(200)
})

// root with API docs
router.all('/', function (req, res) {
  return res.status(200).json({
    welcome: 'Welcome to office sensors REST API!',
    url: 'http://office-sensors.herokuapp.com/apiv1',
    github: 'https://github.com/johnymachine/office-sensors'
  })
})

// bind routes
router.use('/cloudgate/', cloudgateRouter)
router.use('/data/', dataRouter)
router.use('/device/', deviceRouter)

// bind main router and make prefix /apiv1
app.use('/apiv1', router)

// connect to mongodb
mongoose.connect(app.get('mongodb_uri'), function (err, res) {
  if (err) {
    console.log('Error connecting to Mongodb: ' + err)
  } else {
    console.log('Successfully connected to Mongodb.')
        // start server
    app.listen(app.get('port'))
    console.log('Server is running on port: ' + app.get('port'))
  }
})
