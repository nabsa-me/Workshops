export interface ITask {
  id: number
  title: string
  completed: boolean
  deleted: boolean
}

export interface IHomeTaskProps {
  task: ITask
  autofocus?: boolean
  onBlur?: () => void
  onFocus?: () => void
  handleTaskSubmit?: (task: ITask) => void
}

export type doneTaskType = 'done' | 'undone' | ''
