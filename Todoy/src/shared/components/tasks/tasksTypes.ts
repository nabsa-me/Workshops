export interface ITask {
  id: number
  title: string
  completed: boolean
  deleted: boolean
}

export type HomeTabName = 'Active' | 'Completed' | 'Deleted'
