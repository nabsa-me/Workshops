import { useState } from 'react'

export const TaskButton = () => {
  const [taskStatus, setTaskStatus] = useState<'pendant' | 'done'>('pendant')

  const handleTaskStatus = () => setTaskStatus(taskStatus === 'pendant' ? 'done' : 'pendant')

  return (
    <div role='button' className={'button'} onClick={handleTaskStatus}>
      {taskStatus && (
        <div className={`button-background ${taskStatus}`}>
          <div className='check-icon'></div>
        </div>
      )}
    </div>
  )
}

export const DeleteButton = () => {
  const [deleteStatus, setDeleteStatus] = useState<'current' | 'deleted'>('current')

  const handleDeleteStatus = () => setDeleteStatus(deleteStatus === 'current' ? 'deleted' : 'current')

  return (
    deleteStatus && (
      <div role='button' className={`${deleteStatus}`} onClick={handleDeleteStatus}>
        <div className='delete-icon'></div>
      </div>
    )
  )
}
