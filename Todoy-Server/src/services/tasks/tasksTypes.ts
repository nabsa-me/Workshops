export interface ITask {
  id: number
  title: string
  completed: boolean
  deleted: boolean
  createdAt: string
  updatedAt: string
}

export const taskModel = {
  id: 0,
  title: '',
  completed: false,
  deleted: false,
  createdAt: '',
  updatedAt: ''
} as const
