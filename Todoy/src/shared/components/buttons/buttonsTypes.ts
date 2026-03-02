import { Dispatch, SetStateAction } from 'react'
import { doneTaskType, ITask } from '../../../features/tasks/tasksTypes'

export type buttonStatusType = 'completed' | ''

export interface ITaskButtonProps {
  setDoneTask: Dispatch<SetStateAction<doneTaskType>>
  doneTask: doneTaskType
  status: buttonStatusType
  task: ITask
}

export interface IDeleteButtonProps {
  icon: 'restore_from_trash' | 'delete'
  doneTask: doneTaskType
  task: ITask
  setDoneTask: Dispatch<SetStateAction<doneTaskType>>
}
