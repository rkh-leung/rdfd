const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const server = express()

const api = require('./routes/dialogFlow')
// Middleware
server.use(bodyParser.json())

// Routes
server.use('/', api)

if (process.env.NODE_ENV === "production") {
  // js and css files
  server.use(express.static("client/build"));
  // index.html
  server.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

module.exports = server
