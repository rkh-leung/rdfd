const path = require('path')
const express = require('express')

const server = express()

const api = require('../routes/routes')
// Middleware
server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))

// Routes
server.use('/api', api)

module.exports = server
