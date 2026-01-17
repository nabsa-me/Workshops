import { useContext } from 'react'
import { AppContext } from '../../context/appContext'
import { IDeleteButtonProps, ITaskButtonProps } from './buttonsTypes'

export const TaskButton = ({ setDoneTask, doneTask, status }: ITaskButtonProps) => {
  const { doneEffect, setDoneEffect } = useContext(AppContext)

  const handleClick = () => {
    setDoneTask(doneTask === 'done' ? '' : 'done')
    setDoneEffect(doneEffect - 1)
  }

  return (
    <div className={`task-button ${doneTask} ${status}`} onClick={() => handleClick()}>
      <span className='material-symbols-rounded task-button' role='button'>
        check_circle
      </span>
      <span className='material-symbols-rounded task-button-background' role='button'>
        check_circle
      </span>
    </div>
  )
}

export const DeleteButton = ({ icon, doneTask }: IDeleteButtonProps) => {
  return (
    <div className={`task-button ${doneTask}`}>
      <span className={`material-symbols-rounded task-${icon}-button`} role='button'>
        {icon}
      </span>
    </div>
  )
}

export const CreateTaskButton = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <div className='createTaskButton' role='button' onClick={() => handleClick()}>
      <span className='material-symbols-rounded add-task-button bold' role='button'>
        add
      </span>
      <p>Create task</p>
    </div>
  )
}
