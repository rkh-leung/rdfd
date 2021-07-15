const express = require('express')
const router = express.Router()

const chatbot = require('../chatbot/chatbot')

// POST /api/df_text_query
router.post('/api/df_text_query', async (req, res) => {
  const { text, parameters, userID } = req.body
  let responses = await chatbot.textQuery(text, parameters, userID)
  res.send(responses[0].queryResult)
})

// POST /api/df_query_query
router.post('/api/df_event_query', async (req, res) => {
  const { event, parameters, userID } = req.body
  let responses = await chatbot.eventQuery(event, parameters, userID)
  res.send(responses[0].queryResult)
})

module.exports = router