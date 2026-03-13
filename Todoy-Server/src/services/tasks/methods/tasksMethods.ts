import { TasksManager } from './tasksManager'
import { ITask } from '../tasksTypes'

// export const getTasks = async (queryStringParameters: queryStringParametersTypes) => {
//   console.log('GET TASK METHOD', queryStringParameters)
//   return queryStringParameters
// }

export const createTask = async (task: Partial<ITask>) => {
  const tasksManager = new TasksManager()

  const date = new Date().toISOString()
  const taskToCreate = { ...task, createdAt: date, updatedAt: date }

  return await tasksManager.createTask(taskToCreate)
}

export const updateTask = async (task: Partial<ITask>) => {
  const tasksManager = new TasksManager()

  const date = new Date().toISOString()
  const dataToUpdate = { ...task, updatedAt: date }

  return await tasksManager.updateTask(dataToUpdate)
}

// export const deleteTask = async (pathParameters: pathParametersTypes) => {
//   console.log('DELETE TASK METHOD', pathParameters)
// }
