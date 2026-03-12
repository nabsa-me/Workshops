import { DynamoDBClient, DynamoDBServiceException, PutItemCommand, PutItemCommandInput } from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'
import { awsConfig } from '../awsConfig'
import { asyncResponse } from '../../helpers/responseManager'
import { IDynamoRequestProps } from './dynamoDBTypes'

export class DynamoDBManager {
  private client = process.env.STAGE === 'local' ? new DynamoDBClient(awsConfig) : new DynamoDBClient()

  async createItem<T extends Record<string, any>>({ tableName, item, entity }: IDynamoRequestProps<T>) {
    const params: PutItemCommandInput = {
      TableName: tableName,
      Item: marshall(item)
    }

    try {
      await this.client.send(new PutItemCommand(params))
      return asyncResponse({ message: `Create item SUCCESS. ${entity}: ${item.id}`, code: 200 })
    } catch (error) {
      const err = error as DynamoDBServiceException
      const message = `Error creating item at DynamoDbManager. ERROR: ${err.message}`

      console.error(message)
      return asyncResponse({ message, code: err?.$metadata?.httpStatusCode || 500, error: err })
    }
  }
}
