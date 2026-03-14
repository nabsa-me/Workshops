import {
  DynamoDBClient,
  DynamoDBServiceException,
  PutItemCommand,
  PutItemCommandInput,
  UpdateItemCommand,
  UpdateItemCommandInput
} from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'
import { awsConfig } from '../awsConfig'
import { asyncResponse } from '../../helpers/responseManager'
import { IDynamoRequestProps, IDynamoUpdateRequestProps } from './dynamoDBTypes'

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

  async updateItem({ tableName, item, keysToUpdate, entity }: IDynamoUpdateRequestProps) {
    const ExpressionAttributeNames: Record<string, string> = {}
    const ExpressionAttributeValues: Record<string, any> = {}

    const updateExpressions = Object.entries(keysToUpdate || {}).map(([key, value]) => {
      const attrName = `#${key}`
      const attrValue = `:${key}`

      ExpressionAttributeNames[attrName] = key
      ExpressionAttributeValues[attrValue] = value

      return `${attrName} = ${attrValue}`
    })

    const params: UpdateItemCommandInput = {
      TableName: tableName,
      Key: marshall({ id: item }),
      UpdateExpression: `SET ${updateExpressions.join(', ')}`,
      ExpressionAttributeNames,
      ExpressionAttributeValues: marshall(ExpressionAttributeValues)
    }

    try {
      await this.client.send(new UpdateItemCommand(params))

      return asyncResponse({ message: `Update item SUCCESS. ${entity}: ${item}`, code: 200 })
    } catch (error) {
      const err = error as DynamoDBServiceException
      const message = `Error updating item at DynamoDbManager. ERROR: ${err.message}`

      console.error(message)

      return asyncResponse({ message, code: err?.$metadata?.httpStatusCode || 500, error: err })
    }
  }
}
