import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda'
import { getBodyObject, getProcessEvent } from '../../helpers/eventManager'
import { asyncResponse, lambdaResponseHandler } from '../../helpers/responseManager'
import { createTask, updateTask } from './methods/tasksMethods'

import { HTTP_METHODS, httpMethod, httpMethodTypes, ILambdaResult } from '../../types/lambdaTypes'
import { ITask } from './tasksTypes'
import { GENERIC_ERROR_MESSAGE } from '../../helpers/constants'

export const handler = async (
  event: Partial<APIGatewayProxyEvent>,
  context: Partial<Context>
): Promise<APIGatewayProxyResult> => {
  const processEvent = getProcessEvent({ event, context })
  const bodyObject = processEvent.body !== null ? getBodyObject(processEvent.body!) : null
  const httpMethod: httpMethod =
    processEvent.httpMethod !== null && HTTP_METHODS.includes(processEvent.httpMethod as httpMethodTypes)
      ? (processEvent.httpMethod as httpMethodTypes)
      : null

  let result: ILambdaResult

  if (!bodyObject?.data?.id) {
    result = asyncResponse({
      message: 'Error at LAMBDA HANDLER: No id in data',
      userMessage: GENERIC_ERROR_MESSAGE,
      code: 400
    })
    console.error(result.message)
    return lambdaResponseHandler(result, processEvent)
  }

  try {
    switch (httpMethod) {
      // case 'GET':
      //   const tasks = await getTasks(processEvent.queryStringParameters)
      //   result = { message: 'GET TASKS', code: 200, response: tasks }
      //   break

      case 'POST':
        result = await createTask(bodyObject.data)
        if (result.code !== 200) result = { ...result, userMessage: 'Error creating task' }
        break

      case 'PUT':
        const { id, keysToUpdate }: { id: number; keysToUpdate: Partial<ITask> } = { ...bodyObject.data }

        if (!keysToUpdate) {
          result = asyncResponse({
            message: 'Error at PUT case in TASKS LAMBDA HANDLER: No keysToUpdate',
            userMessage: 'Error updating task',
            code: 400
          })
          console.error(result.message)
          break
        }

        result = await updateTask({ id, keysToUpdate })
        if (result.code !== 200) result = { ...result, userMessage: 'Error updating task' }
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
        result = { message, userMessage: GENERIC_ERROR_MESSAGE, code: 404 }
    }

    return lambdaResponseHandler(result, processEvent)
  } catch (error) {
    console.error(`FATAL ERROR AT ${String(processEvent.functionName).toUpperCase()}`, error)
    throw error
  }
}
