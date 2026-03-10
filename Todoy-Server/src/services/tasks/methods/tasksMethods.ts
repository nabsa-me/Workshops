import { pathParametersTypes, queryStringParametersTypes } from '../../../types/lambdaTypes'

export const getTasks = async (queryStringParameters: queryStringParametersTypes) => {
  console.log('GET TASK METHOD', queryStringParameters)
  return queryStringParameters
}

export const updateTask = async (body: string | null) => {
  console.log('UPDATE TASK METHOD', body)
}

export const createTask = async (body: string | null) => {
  console.log('CREATE TASK METHOD', body)
}

export const deleteTask = async (pathParameters: pathParametersTypes) => {
  console.log('DELETE TASK METHOD', pathParameters)
}
