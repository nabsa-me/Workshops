import { TasksManager } from './tasksManager'
import { ITask, taskModel } from '../tasksTypes'
import { keyValidationErrors } from '../../../helpers/helpers'
import { asyncResponse } from '../../../helpers/responseManager'

// export const getTasks = async (queryStringParameters: queryStringParametersTypes) => {
//   console.log('GET TASK METHOD', queryStringParameters)
//   return queryStringParameters
// }

export const createTask = async (task: Partial<ITask>) => {
  const keysFailed = keyValidationErrors(task, taskModel)

  if (keysFailed) {
    return asyncResponse({
      message: 'Error at CREATE TASK in tasksMethods.ts. Keys types failed',
      code: 400,
      error: keysFailed
    })
  }

  const tasksManager = new TasksManager()
  const date = new Date().toISOString()
  const taskToCreate = { ...task, createdAt: date, updatedAt: date }

  return await tasksManager.createTask(taskToCreate)
}

export const updateTask = async ({ id, keysToUpdate }: { id: number; keysToUpdate: Partial<ITask> }) => {
  const keysFailed = keyValidationErrors(keysToUpdate, taskModel)

  if (keysFailed) {
    return asyncResponse({
      message: 'Error at UPDATE TASK in tasksMethods.ts. Keys types failed',
      code: 400,
      error: keysFailed
    })
  }

  const tasksManager = new TasksManager()
  const date = new Date().toISOString()
  const dataToUpdate = { ...keysToUpdate, updatedAt: date }

  return await tasksManager.updateTask({ id, keysToUpdate: dataToUpdate })
}

// export const deleteTask = async (pathParameters: pathParametersTypes) => {
//   console.log('DELETE TASK METHOD', pathParameters)
// }
