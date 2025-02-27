import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'

const client = new DynamoDBClient()
const documentClient = DynamoDBDocumentClient.from(client)
const tableName = process.env.tableName

export const handler = async (event: Record<string, any>) => {
  // let's log the incoming event
  let payloadAsString = JSON.stringify(event)
  console.log(payloadAsString)
  try {
    console.log(`Writing to dynamodb: ${JSON.stringify(event)}`)
    let ddbResponse = await documentClient.send(
      new PutCommand({
        TableName: tableName,
        Item: {
          SessionId: event.SessionId,
          TopX: event.TopX
        }
      })
    )
    console.log(ddbResponse)
  } catch (e) {
    //let's handle the errors, if any
    console.log('Error:', e)
    const response = {
      statusCode: 200,
      body: e
    }
    return response
  }
  const response = {
    statusCode: 200
  }
  return response
}
