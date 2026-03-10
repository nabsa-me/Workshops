import { getProcessEvent } from '../../helpers/eventManager'
import { lambdaResponseHandler } from '../../helpers/responseManager'
import { getTasks, updateTask, createTask, deleteTask } from './methods/tasksMethods'

export const handler = async (event: Record<string, any>, context: any) => {
  const processEvent = getProcessEvent({ event, context })
  const { httpMethod } = processEvent

  console.log('TASKS HANDLER EVENT >>>>>>>>>>', processEvent)
  let result

  try {
    switch (httpMethod) {
      case 'GET':
        const getTasksResponse = await getTasks(event.queryStringParameters)
        result = { message: 'GET TASKS', code: 200, response: getTasksResponse }
        break

      case 'PATCH':
        await updateTask(event.body)
        result = { message: 'PATCH TASKS', code: 200 }
        break

      case 'POST':
        await createTask(event.body)
        result = { message: 'POST TASKS', code: 200 }
        break

      case 'DELETE':
        await deleteTask(event.pathParameters)
        result = { message: 'DELETE TASKS', code: 200 }
        break

      default:
        result = {
          message: `Method ${String(httpMethod).toUpperCase()} not supported at ${String(
            processEvent.functionName
          ).toUpperCase()}`,
          code: 404
        }
    }

    return lambdaResponseHandler(result, processEvent)
  } catch (error: any) {
    throw Error(`FATAL ERROR AT at ${String(processEvent.functionName).toUpperCase()}`, error)
  }
}
