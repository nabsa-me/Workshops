import { Dispatch, SetStateAction } from 'react'

export type buttonStatusType = 'completed' | ''

export interface ITaskButtonProps {
  setDoneTask: Dispatch<SetStateAction<'' | 'done'>>
  doneTask: 'done' | ''
  status: buttonStatusType
}

export interface IDeleteButtonProps {
  icon: 'restore_from_trash' | 'delete'
  doneTask: 'done' | ''
}
