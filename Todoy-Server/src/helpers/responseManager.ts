import { ILambdaResult, IProcessEvent } from '../types/lambdaTypes'

export const lambdaResponseHandler = (result: ILambdaResult, event: IProcessEvent) => {
  const bodyObject = { message: result.message, event, ...(result.response && { response: result.response }) }

  return {
    statusCode: result.code,
    body: JSON.stringify(bodyObject)
  }
}
