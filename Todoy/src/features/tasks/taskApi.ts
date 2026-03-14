import axios from 'axios'
import { tasks } from './tasksFile'
import { ITask } from './tasksTypes'
import { API_URL } from '../../shared/constants'

export const getTasks = async (): Promise<ITask[]> => {
  return await tasks
}

export const createTask = async (task: ITask): Promise<void> => {
  await axios.post(`${API_URL}/tasks`, {
    data: task,
    headers: {
      'x-api-key': process.env.API_KEY
    }
  })
}

export const updateTask = async ({ id, keysToUpdate }: { id: number; keysToUpdate: Partial<ITask> }): Promise<void> => {
  await axios.put(`${API_URL}/tasks`, {
    data: { id, keysToUpdate },
    headers: {
      'x-api-key': process.env.API_KEY
    }
  })
}
