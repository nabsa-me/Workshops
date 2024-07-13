import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { BatchWriteCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'

const client = new DynamoDBClient()
const documentClient = DynamoDBDocumentClient.from(client)
const tableName = process.env.tableName

export const handler = async (event: any) => {
  // let's log the incoming event
  let payloadAsString = JSON.stringify(event)
  console.log(payloadAsString)
  try {
    let batch = []
    let putRequestBatches = []
    // event contains Records, which is an array with a certain structure
    for (let i = 0; i < event.Records.length; i++) {
      //let's get the Record
      let record = event.Records[i]
      // let's decode the base64-encoded payload that was sent
      let data = Buffer.from(record.kinesis.data, 'base64').toString('utf-8')
      // let's show the data
      console.log(`Data received: ${data}`)
      // let's show the timestamp in which it was received (approximately)
      let receivedTst = new Date(record.kinesis.approximateArrivalTimestamp * 1000)
      console.log(`Received tst: ${receivedTst}`)
      //-----
      // The following part of the code deals with the DynamoDB batches
      //-----
      //
      // THE FOLLOWING TWO STATEMENTS WERE ADAPTED TO PREPARE
      // THE RECORD FOR DYNAMODB
      let dataForDynamoDB = JSON.parse(data)
      dataForDynamoDB['TransactionId'] =
        dataForDynamoDB.User +
        '#' +
        dataForDynamoDB.Client +
        '#' +
        dataForDynamoDB.Order.Symbol +
        '#' +
        dataForDynamoDB.Order.Volume +
        '#' +
        dataForDynamoDB.Order.Price +
        '#' +
        dataForDynamoDB.Timestamp
      // put data into the current batch
      batch.push({
        PutRequest: { Item: dataForDynamoDB }
      })
      // Batches are limited to 25 items; so, we "close" a batch when we reach 25 items.
      if (batch.length == 25 || i == event.Records.length - 1) {
        putRequestBatches.push(batch)
        batch = []
      }
    }
    // Here we have in putRequestBatches an array of batches
    for (let i = 0; i < putRequestBatches.length; i++) {
      let params = {
        RequestItems: {
          [`${tableName}`]: putRequestBatches[i]
        }
      }
      console.log(`Writing to dynamodb: ${JSON.stringify(params)}`)
      let batchWriteCommand = new BatchWriteCommand(params)
      let ddbResponse = await documentClient.send(batchWriteCommand)
      console.log(ddbResponse)
    }
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
