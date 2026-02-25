import { useContext } from 'react'
import { AppContext } from '../../../app/context/appContext'
import { IDeleteButtonProps, ITaskButtonProps } from './buttonsTypes'
import { FilledIconButton, Icon, IconButton } from '../icons/icons'
import { useTasks } from '../../hooks/useTasks'

export const TaskButton = ({ setDoneTask, doneTask, status, task }: ITaskButtonProps) => {
  const { doneEffect, setDoneEffect } = useContext(AppContext)
  const { updateTask } = useTasks()

  const handleClick = () => {
    setDoneTask(doneTask === 'done' ? '' : 'done')
    setTimeout(() => updateTask(task.id, { completed: true }), 750)
    setDoneEffect(doneEffect - 1)
  }

  return (
    <div className={`task-button ${doneTask} ${status}`} onClick={handleClick}>
      <IconButton icon='check_circle' className='task-button' type='thin' />
      <FilledIconButton icon='check_circle' className='task-button-background' />
    </div>
  )
}

export const DeleteButton = ({ icon, doneTask }: IDeleteButtonProps) => {
  return (
    <div className={`task-button ${doneTask}`}>
      <IconButton icon={icon} className={`task-${icon}-button`} type='thin' />
    </div>
  )
}

export const CreateTaskButton = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <div className='createTaskButton' role='button' onClick={() => handleClick()}>
      <Icon icon='add' className='add-task-button' type='bold' />
      <p>Create task</p>
    </div>
  )
}
