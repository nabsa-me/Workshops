import { Dispatch, SetStateAction, useContext } from 'react'
import { AppContext } from '../../context/appContext'

export const TaskButton = ({
  setDoneTask,
  doneTask,
  status
}: {
  setDoneTask: Dispatch<SetStateAction<'' | 'done'>>
  doneTask: 'done' | ''
  status: 'completed' | ''
}) => {
  const context = useContext(AppContext)
  const { doneEffect, setDoneEffect } = context

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

export const DeleteButton = ({ icon, doneTask }: { icon: 'restore_from_trash' | 'delete'; doneTask: 'done' | '' }) => {
  return (
    <div className={`task-button ${doneTask}`}>
      <span className={`material-symbols-rounded task-${icon}-button`} role='button'>
        {icon}
      </span>
    </div>
  )
}
