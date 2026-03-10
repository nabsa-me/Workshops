import { getProcessEvent } from './helpers/eventManager'
import { lambdaResponseHandler } from './helpers/responseManager'

export const handler = async (event: Record<string, any>, context: any) => {
  const processEvent = getProcessEvent({ event, context })
  const { httpMethod } = processEvent

  console.log('TASKS HANDLER EVENT >>>>>>>>>>', processEvent)
  let result

  try {
    switch (httpMethod) {
      case 'GET':
        console.log('GET TASKS')
        result = { message: 'GET TASKS', event: processEvent, code: 200 }
        break

      case 'PATCH':
        console.log('PATCH TASKS')
        result = { message: 'PATCH TASKS', event: processEvent, code: 200 }
        break

      case 'POST':
        console.log('POST TASKS')
        result = { message: 'POST TASKS', event: processEvent, code: 200 }
        break

      case 'DELETE':
        console.log('DELETE TASKS')
        result = { message: 'DELETE TASKS', event: processEvent, code: 200 }
        break

      default:
        result = {
          message: `Method ${String(httpMethod).toUpperCase()} not supported at ${String(
            processEvent.functionName
          ).toUpperCase()}`,
          event: processEvent,
          code: 404
        }
    }

    return lambdaResponseHandler(result)
  } catch (error: any) {
    throw new Error(`FATAL ERROR AT at ${String(processEvent.functionName).toUpperCase()}`, error)
  }
}
