import { ILambdaResult, IProcessEvent } from '../types/lambdaTypes'

export const lambdaResponseHandler = (result: ILambdaResult, event: IProcessEvent) => {
  const bodyObject = {
    message: result.message,
    event,
    ...(result.response && { response: result.response }),
    ...(result.error && { error: result.error })
  }

  return {
    statusCode: result.code,
    body: JSON.stringify(bodyObject)
  }
}

export const asyncResponse = ({ message, code, response, error }: ILambdaResult) => {
  return { message, code, response, error }
}
