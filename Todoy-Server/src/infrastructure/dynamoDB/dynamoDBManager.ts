import { DynamoDBClient, PutItemCommand, PutItemCommandInput } from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'
import { awsConfig } from '../awsConfig'
import { asyncResponse } from '../../helpers/responseManager'
import { entityTypes } from '../../types/servicesTypes'

export class DynamoDBManager {
  private client = new DynamoDBClient(awsConfig)

  async createItem<T extends Record<string, any>>(tableName: string, item: T, entity: entityTypes) {
    const params: PutItemCommandInput = {
      TableName: tableName,
      Item: marshall(item)
    }

    try {
      await this.client.send(new PutItemCommand(params))
      return asyncResponse(`Create item SUCCESS. ${entity}: ${item.id}`, 200)
    } catch (error) {
      const message = `Error creating item at DynamoDbManager. ERROR: ${error}`
      console.error(message)

      return asyncResponse(message, 500)
    }
  }
}
