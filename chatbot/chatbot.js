const dialogflow = require('dialogflow')
const structjson = require('./structjson')
const config = require('../config/keys')


const sessionID = config.dialogFlowSessionID
const languageCode = config.dialogFlowSessionLanguageCode
const projectID = config.googleProjectID
const credentials = {
  client_email: config.googleClientEmail,
  private_key: config.googlePrivateKey
}

const sessionClient = new dialogflow.SessionsClient({ projectID, credentials })


module.exports = {
  textQuery: async (text, userID, parameters = {}) => {
    let sessionPath = sessionClient.sessionPath(projectID, sessionID + userID)
    let self = module.exports
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text,
          languageCode
        }
      },
      queryParams: {
        payload: {
          data: parameters
        }
      }
    }
    let responses = await sessionClient.detectIntent(request)
    responses = await self.handleAction(responses)
    return responses
  },

  eventQuery: async (event, userID, parameters = {}) => {
    let sessionPath = sessionClient.sessionPath(projectID, sessionID + userID)
    let self = module.exports
    const request = {
      session: sessionPath,
      queryInput: {
        event: {
          name: event,
          parameters: structjson.jsonToStructProto(parameters),
          languageCode
        }
      }
    }
    let responses = await sessionClient.detectIntent(request)
    responses = await self.handleAction(responses)
    return responses
  },

  handleAction: (responses) => {
    return responses
  }
}