import { Dispatch, SetStateAction } from 'react'

export const TaskButton = ({
  setDoneTask,
  doneTask
}: {
  setDoneTask: Dispatch<SetStateAction<'' | 'done'>>
  doneTask: 'done' | ''
}) => {
  return (
    <div className={`task-button ${doneTask}`} onClick={() => setDoneTask(doneTask === 'done' ? '' : 'done')}>
      <span className='material-symbols-rounded task-button' role='button'>
        check_circle
      </span>
      <span className='material-symbols-rounded task-button-background' role='button'>
        check_circle
      </span>
    </div>
  )
}

export const DeleteButton = () => {
  return (
    <div className='task-button'>
      <span className='material-symbols-rounded task-delete-button' role='button'>
        delete
      </span>
    </div>
  )
}
