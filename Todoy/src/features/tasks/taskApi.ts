import { updateTaskSelectorUpdateType } from '../../app/store/tasksStore'
import { tasks } from './tasksFile'
import { ITask } from './tasksTypes'

export const getTasks = async (): Promise<ITask[]> => {
  return await tasks
}

export const createTask = async (task: ITask): Promise<void> => {
  // console.log('backend create', task)
}

export const updateTask = async (id: number, updates: updateTaskSelectorUpdateType): Promise<void> => {
  // console.log('backend update', id, updates)
}

export const completeTask = async (id: number): Promise<void> => {
  // console.log('backend complete', id)
}

export const deleteTask = async (id: number): Promise<void> => {
  // console.log('backend delete', id)
}

export const cleanTask = async (id: number): Promise<void> => {
  // console.log('backend clean', id)
}
