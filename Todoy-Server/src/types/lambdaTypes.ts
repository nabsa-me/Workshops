import { DynamoDBServiceException } from '@aws-sdk/client-dynamodb'
import { APIGatewayProxyEvent } from 'aws-lambda'

export const HTTP_METHODS = ['GET', 'PATCH', 'POST', 'DELETE', 'PUT', 'HEAD', 'ANY'] as const

export type resourceTypes = '/task' | '/users'
export type pathTypes = '/task' | '/users'
export type stageTypes = 'latest' | 'stage' | 'prod' | 'local'
export type queryStringParametersTypes = Record<string, string>
export type multiValueQueryStringParametersTypes = Record<string, string[]>
export type pathParametersTypes = Record<string, string>
export type bodyObjectTypes = Record<string, any>

export type httpMethodTypes = (typeof HTTP_METHODS)[number]
export type httpMethod = httpMethodTypes | null

export interface IExpressLambdaEvent {
  resource: resourceTypes
  path: pathTypes
  httpMethod: httpMethod
  queryStringParameters: queryStringParametersTypes
  multiValueQueryStringParameters: multiValueQueryStringParametersTypes
  pathParameters: pathParametersTypes
  requestContext: Partial<APIGatewayProxyEvent['requestContext']>
  body: string | null
}

export interface IExpressLambdaContext {
  functionName: string
}

export interface IProcessEvent {
  resource: resourceTypes
  path: pathTypes
  httpMethod: httpMethodTypes
  queryStringParameters: queryStringParametersTypes
  multiValueQueryStringParameters: multiValueQueryStringParametersTypes
  pathParameters: pathParametersTypes
  requestContext: { stage: stageTypes }
  body: string | null
  functionName: string
}

export interface ILambdaResult {
  message: string
  code: number
  response?: Record<string, any> | undefined
  error?: Record<string, any> | undefined | DynamoDBServiceException
  userMessage?: string
}
