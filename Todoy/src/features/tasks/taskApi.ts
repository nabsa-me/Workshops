import axios from 'axios'
import { updateTaskSelectorUpdateType } from '../../app/store/tasksStore'
import { tasks } from './tasksFile'
import { ITask } from './tasksTypes'
import { API_URL } from '../../shared/constants'

export const getTasks = async (): Promise<ITask[]> => {
  return await tasks
}

export const createTask = async (task: ITask): Promise<void> => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, task, {
      headers: {
        'x-api-key': process.env.API_KEY
      }
    })

    console.log(response.data)
  } catch (error: any) {
    console.error(error.response?.data || error.message)
  }
}

export const updateTask = async (id: number, updates: updateTaskSelectorUpdateType): Promise<void> => {
  console.log('backend update', id, updates)
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
