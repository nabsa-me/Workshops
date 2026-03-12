import axios from 'axios'
import { updateTaskSelectorUpdateType } from '../../app/store/tasksStore'
import { tasks } from './tasksFile'
import { ITask } from './tasksTypes'

export const getTasks = async (): Promise<ITask[]> => {
  return await tasks
}

export const createTask = async (task: ITask): Promise<void> => {
  try {
    const response = await axios.post('https://j2n7d1vffc.execute-api.eu-west-3.amazonaws.com/latest/tasks', task, {
      headers: {
        'x-api-key': process.env.TODOY_API_KEY
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
