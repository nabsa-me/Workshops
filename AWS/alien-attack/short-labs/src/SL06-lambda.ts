'use strict'

import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb'

const DDBClient = new DynamoDBClient()
const DynamoDB = DynamoDBDocumentClient.from(DDBClient)

/**
 * This function reads from the database.
 * You can replace this with the code depending on your database
 */
const readTopxDataFromDatabase = async function (sessionId: any) {
  let result = null
  console.log('PROVIDED SESSION ID FOR DATABASE QUERY IS:', sessionId)
  let params = {
    TableName: process.env.TABLENAME,
    Key: {
      SessionId: sessionId
    }
  }
  let getCommand = new GetCommand(params)
  try {
    let data = await DynamoDB.send(getCommand)
    if (data && data.Item) result = data.Item
    else result = {}
  } catch (exception) {
    result = exception
  }
  return result
}

/**
 * This function does the required computation.
 */
const computeStatisticsForSession = async function (sessionId: any) {
  // let's start by reading the session data from the database
  // retrieving the record attached to 'sessionId'
  try {
    let topXSessionData: any = await readTopxDataFromDatabase(sessionId)
    if (topXSessionData instanceof Error) {
      return topXSessionData
    } else {
      if (!topXSessionData.TopX)
        // Table is empty. No data found.
        return null
      else {
        let statistics = [] as any
        let position = 1
        // Make the computations
        topXSessionData.TopX.forEach((item: any) => {
          let itemStatistics = {} as any
          itemStatistics['Nickname'] = item.Nickname
          itemStatistics['Position'] = position++
          if (item.Shots != 0) {
            itemStatistics['Performance'] = item.Score / item.Shots
          } else {
            if (item.Score != 0) itemStatistics['Performance'] = -1
            else itemStatistics['Performance'] = 0
          }
          statistics.push(itemStatistics)
        })
        return statistics
      }
    }
  } catch (exception) {
    console.log('Error')
    console.log(exception)
    return exception
  }
}

/**
 * This function formats the response in accordance to what is
 * expected with Lambda Integration. You may need to change it
 * if you move the code out of Lambda
 */
const formatResponse = function (data: any) {
  let response = {
    isBase64Encoded: false,
    statusCode: null || 0,
    body: null || '',
    headers: {
      'Content-Type': null || ''
    }
  }
  if (data as any) {
    console.log('ERROR')
    console.log(data)
    response.statusCode = data.statusCode
    response.body = data.message
    response.headers['Content-Type'] = 'text/plain'
  } else {
    console.log('SUCCESS')
    console.log(data)
    if (data == null) {
      response.statusCode = 404
      response.headers['Content-Type'] = 'text/plain'
      response.body = 'Inexistent session'
      // If you want to test the base64 encoding, comment the line above, and uncomment those two below
      //response.isBase64Encoded = true;
      //response.body = 'SW5leGlzdGVudCBzZXNzaW9u';
    } else {
      response.statusCode = 200
      response.headers['Content-Type'] = 'application/json'
      response.body = JSON.stringify(data)
    }
  }
  return response
}

/**
 * This function validates the event, and must
 * be rewritten if you move this out of Lambda
 */
const validateEvent = function (event: any) {
  let sessionId = null
  let isProxyIntegration = null
  try {
    // if this structure is present, we have a direct integration
    sessionId = event.params.querystring.sessionId
    isProxyIntegration = false
  } catch (_) {
    try {
      // if this structure is present, we have a Proxy integration
      sessionId = event.queryStringParameters.sessionId
      isProxyIntegration = true
    } catch (_) {
      sessionId = null
      isProxyIntegration = null
    }
  }
  let result = {
    sessionId: sessionId,
    isProxyIntegration: isProxyIntegration
  }
  console.log(result)
  return result
}

/**
 * This is the entry-point for the Lambda function
 */
export const handler = async (event: any) => {
  let response = null
  // Let's show the received event
  console.log(event)
  // Let's validate the event, to extract the sessionId (if we have one)
  // eventValidation will have the form { "sessionId" : sessionIdValue, "isProxyIntegration" : [ true | false ] }
  // isProxyIntegration tells us about the API Gateway integration (if any) to this lambda function
  let eventValidation = validateEvent(event)
  let sessionId = eventValidation.sessionId
  if (!sessionId)
    // let's format the response to what is expected by an API Gateway integration
    response = formatResponse(null)
  else {
    // call the function that computes the statistics
    let statistics = await computeStatisticsForSession(sessionId)
    // let's format the response to what is expected by an API Gateway integration
    response = formatResponse(statistics)
  }
  return response
}
