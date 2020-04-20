const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const server = express()

const api = require('../routes/routes')
// Middleware
server.use(bodyParser.json())

// Routes
server.use('/api', api)

module.exports = server
