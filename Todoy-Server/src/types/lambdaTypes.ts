import { APIGatewayProxyEvent } from 'aws-lambda'

export type resourceTypes = '/task' | '/users'
export type pathTypes = '/task' | '/users'
export type httpMethodTypes = 'GET' | 'PATCH' | 'POST' | 'DELETE'
export type stageTypes = 'latest' | 'stage' | 'prod'
export type queryStringParametersTypes = Record<string, string>
export type multiValueQueryStringParametersTypes = Record<string, string[]>
export type pathParametersTypes = Record<string, string>

export interface IExpressLambdaEvent {
  resource: resourceTypes
  path: pathTypes
  httpMethod: httpMethodTypes
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
  code: 200 | 400 | 404 | 500
  response?: Record<string, any>
}
