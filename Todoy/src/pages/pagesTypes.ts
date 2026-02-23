import { ITask } from '../features/tasks/tasksTypes'

export type HomeTabName = 'Active' | 'Completed' | 'Deleted'
export const WIDGET_TASK_TABS: HomeTabName[] = ['Active', 'Completed', 'Deleted']

export interface IHomeActiveTasksViewProps {
  widgetTasks: ITask[]
  handleClick: () => void
  focused?: number | null
  setFocusedTaskId?: (id: number | null) => void
  updateTask: (id: number, changes: Partial<ITask>) => void
}

export interface IHomeTasksView {
  widgetTasks: ITask[]
  updateTask: (id: number, changes: Partial<ITask>) => void
}
