const dialogflow = require('dialogflow')
const structjson = require('./structjson')
const config = require('../config/keys')


const sessionID = config.dialogFlowSessionID
const dfLanguageCode = config.dialogFlowSessionLanguageCode
const projectID = config.googleProjectID
const credentials = {
  client_email: config.googleClientEmail,
  private_key: config.googlePrivateKey
}

const sessionClient = new dialogflow.SessionsClient({ projectID, credentials })
const sessionPath = sessionClient.sessionPath(projectID, sessionID)


module.exports = {
  textQuery: async (text, parameters) => {
    let self = module.exports
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: text,
          languageCode: dfLanguageCode
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
  eventQuery: async (event, parameters) => {
    let self = module.exports
    const request = {
      session: sessionPath,
      queryInput: {
        event: {
          name: event,
          parameters: structjson.jsonToStructProto(parameters),
          languageCode: dfLanguageCode
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