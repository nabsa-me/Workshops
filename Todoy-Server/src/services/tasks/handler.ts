import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda'
import { getBodyObject, getProcessEvent } from '../../helpers/eventManager'
import { lambdaResponseHandler } from '../../helpers/responseManager'
// import { getTasks, updateTask, createTask, deleteTask } from './methods/tasksMethods'
import { createTask } from './methods/tasksMethods'

import { HTTP_METHODS, httpMethod, httpMethodTypes, ILambdaResult } from '../../types/lambdaTypes'
import { ITask } from './tasksTypes'

export const handler = async (
  event: Partial<APIGatewayProxyEvent>,
  context: Partial<Context>
): Promise<APIGatewayProxyResult> => {
  const processEvent = getProcessEvent({ event, context })
  console.log('TASKS HANDLER EVENT >>>>>>>>>>', processEvent)

  const bodyObject = processEvent.body !== null ? getBodyObject(processEvent.body!) : null

  const httpMethod: httpMethod =
    processEvent.httpMethod !== null && HTTP_METHODS.includes(processEvent.httpMethod as httpMethodTypes)
      ? (processEvent.httpMethod as httpMethodTypes)
      : null

  let result: ILambdaResult

  try {
    switch (httpMethod) {
      // case 'GET':
      //   const tasks = await getTasks(processEvent.queryStringParameters)
      //   result = { message: 'GET TASKS', code: 200, response: tasks }
      //   break

      // case 'PATCH':
      //   await updateTask(processEvent.body)
      //   result = { message: 'PATCH TASKS', code: 200 }
      //   break

      case 'POST':
        result = await createTask(bodyObject as ITask)
        break

      // case 'DELETE':
      //   await deleteTask(processEvent.queryStringParameters)
      //   result = { message: 'DELETE TASKS', code: 200 }
      //   break

      default:
        const message = `Method ${String(httpMethod).toUpperCase()} not supported at ${String(
          processEvent.functionName
        ).toUpperCase()}`

        console.error(message)
        result = { message, code: 404 }
    }

    return lambdaResponseHandler(result, processEvent)
  } catch (error) {
    console.error(`FATAL ERROR AT ${String(processEvent.functionName).toUpperCase()}`, error)
    throw error
  }
}
