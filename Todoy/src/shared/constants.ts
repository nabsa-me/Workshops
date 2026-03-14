import { ITask } from '../features/tasks/tasksTypes'

export const API_URL = process.env.ENV === 'local' ? process.env.API_URL : `${process.env.API_URL}/${process.env.STAGE}`
export const NEW_TASK_TEMPLATE: ITask = { id: 0, title: '', deleted: false, completed: false }
