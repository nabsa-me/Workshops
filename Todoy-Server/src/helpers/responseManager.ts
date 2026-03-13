import { ILambdaResult, IProcessEvent } from '../types/lambdaTypes'

export const lambdaResponseHandler = (result: ILambdaResult, event: IProcessEvent) => {
  const bodyObject = {
    message: result.message,
    event,
    ...(result.response && { response: result.response }),
    ...(result.error && { error: result.error }),
    ...(result.userMessage && { userMessage: result.userMessage })
  }

  return {
    statusCode: result.code,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type,x-api-key',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE'
    },
    body: JSON.stringify(bodyObject)
  }
}

export const asyncResponse = ({ message, code, response, error }: ILambdaResult) => {
  return { message, code, response, error }
}
