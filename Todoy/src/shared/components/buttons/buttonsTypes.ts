import { Dispatch, SetStateAction } from 'react'
import { ITask } from '../../../features/tasks/tasksTypes'

export type buttonStatusType = 'completed' | ''

export interface ITaskButtonProps {
  setDoneTask: Dispatch<SetStateAction<'' | 'done'>>
  doneTask: 'done' | ''
  status: buttonStatusType
  task: ITask
}

export interface IDeleteButtonProps {
  icon: 'restore_from_trash' | 'delete'
  doneTask: 'done' | ''
}
