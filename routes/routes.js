const express = require('express')
const router = express.Router()

const chatbot = require('../chatbot/chatbot')

// GET /api
router.get('/api', (req, res) => {
  res.send('Server route')
})

// POST /api/df_text_query
router.post('/api/df_text_query', async (req, res) => {
  let responses = await chatbot.textQuery(req.body.text, req.body.parameters)
  res.send(responses[0].queryResult)
})

// POST /api/df_query_query
router.post('/api/df_event_query', async (req, res) => {
  let responses = await chatbot.eventQuery(req.body.event, req.body.parameters)
  res.send(responses[0].queryResult)
})

module.exports = router