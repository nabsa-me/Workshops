import { TasksTable } from '../../../infrastructure/dynamoDB/tasksTable'
// import { pathParametersTypes, queryStringParametersTypes } from '../../../types/lambdaTypes'
import { ITask } from '../tasksTypes'

// export const getTasks = async (queryStringParameters: queryStringParametersTypes) => {
//   console.log('GET TASK METHOD', queryStringParameters)
//   return queryStringParameters
// }

// export const updateTask = async (body: string | null) => {
//   console.log('UPDATE TASK METHOD', body)
// }

export const createTask = async (task: ITask) => {
  const tasksTable = new TasksTable()
  return await tasksTable.createTask(task)
}

// export const deleteTask = async (pathParameters: pathParametersTypes) => {
//   console.log('DELETE TASK METHOD', pathParameters)
// }
