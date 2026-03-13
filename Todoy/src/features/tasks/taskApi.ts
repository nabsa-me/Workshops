import axios, { AxiosError } from 'axios'
import { tasks } from './tasksFile'
import { ITask } from './tasksTypes'
import { API_URL } from '../../shared/constants'

export const getTasks = async (): Promise<ITask[]> => {
  return await tasks
}

export const createTask = async (task: ITask): Promise<void> => {
  try {
    await axios.post(`${API_URL}/tasks`, {
      data: task,
      headers: {
        'x-api-key': process.env.API_KEY
      }
    })
  } catch (error) {
    const axiosError = error as AxiosError<{ userMessage: string }>
    console.error(axiosError.response?.data)
  }
}

export const updateTask = async (task: Partial<ITask>): Promise<void> => {
  try {
    await axios.put(`${API_URL}/tasks`, {
      data: task,
      headers: {
        'x-api-key': process.env.API_KEY
      }
    })
  } catch (error) {
    const axiosError = error as AxiosError<{ userMessage: string }>
    console.error(axiosError.response?.data.userMessage)
  }
}

export const completeTask = async (id: number): Promise<void> => {
  console.log('backend complete', id)
}

export const deleteTask = async (id: number): Promise<void> => {
  console.log('backend delete', id)
}

export const cleanTask = async (id: number): Promise<void> => {
  console.log('backend clean', id)
}
