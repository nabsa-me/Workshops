import { updateTaskSelectorUpdateType } from '../../app/store/tasksStore'
import { tasks } from './tasksFile'
import { ITask } from './tasksTypes'

export const getTasks = async (): Promise<ITask[]> => {
  return await tasks
}

export const updateTask = async (id: number, updates: updateTaskSelectorUpdateType): Promise<void> => {
  console.log('backend update', id, updates)
}
