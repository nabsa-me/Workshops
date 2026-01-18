import { tasks } from './tasksFile'
import { ITask } from './tasksTypes'

export const getTasks = async (): Promise<ITask[]> => {
  return await tasks
}
