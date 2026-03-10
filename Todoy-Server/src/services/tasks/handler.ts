import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda'
import { getProcessEvent } from '../../helpers/eventManager'
import { lambdaResponseHandler } from '../../helpers/responseManager'
import { getTasks, updateTask, createTask, deleteTask } from './methods/tasksMethods'
import { ILambdaResult } from '../../types/lambdaTypes'

export const handler = async (
  event: Partial<APIGatewayProxyEvent>,
  context: Partial<Context>
): Promise<APIGatewayProxyResult> => {
  const processEvent = getProcessEvent({ event, context })
  const { httpMethod } = processEvent

  console.log('TASKS HANDLER EVENT >>>>>>>>>>', processEvent)

  let result: ILambdaResult

  try {
    switch (httpMethod) {
      case 'GET':
        const tasks = await getTasks(processEvent.queryStringParameters)
        result = { message: 'GET TASKS', code: 200, response: tasks }
        break

      case 'PATCH':
        await updateTask(processEvent.body)
        result = { message: 'PATCH TASKS', code: 200 }
        break

      case 'POST':
        await createTask(processEvent.body)
        result = { message: 'POST TASKS', code: 200 }
        break

      case 'DELETE':
        await deleteTask(processEvent.queryStringParameters)
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
  } catch (error) {
    throw new Error(`FATAL ERROR AT ${String(processEvent.functionName).toUpperCase()}`)
  }
}
