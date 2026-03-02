import { IDeleteButtonProps, ITaskButtonProps } from './buttonsTypes'
import { FilledIconButton, Icon, IconButton } from '../icons/icons'
import { useTasks } from '../../hooks/useTasks'
import { useDoneEffect } from '../../hooks/useDoneEffect'

export const TaskButton = ({ setDoneTask, doneTask, status, task }: ITaskButtonProps) => {
  const { doneEffect, setDoneEffect } = useDoneEffect()
  const { completeTask, cleanTask } = useTasks()

  const handleClick = () => {
    if (task.deleted) {
      setTimeout(() => completeTask(task.id), 350)
      return
    }

    if (task.completed) {
      setDoneTask(doneTask === 'undone' ? '' : 'undone')
      setTimeout(() => completeTask(task.id), 350)
      return
    }

    if (task.title.trim() === '') {
      setDoneTask(doneTask === 'undone' ? '' : 'undone')
      setTimeout(() => cleanTask(task.id), 350)
      return
    }

    setDoneTask(doneTask === 'done' ? '' : 'done')
    setTimeout(() => completeTask(task.id), 750)
    setDoneEffect(doneEffect - 1)
  }

  return (
    <div className={`task-button ${doneTask} ${status}`} onClick={handleClick}>
      <IconButton icon='check_circle' className='task-button' type='thin' />
      <FilledIconButton icon='check_circle' className='task-button-background' />
    </div>
  )
}

export const DeleteButton = ({ icon, doneTask, task, setDoneTask }: IDeleteButtonProps) => {
  const { doneEffect, setDoneEffect } = useDoneEffect()
  const { deleteTask } = useTasks()

  const handleClick = () => {
    setDoneTask(doneTask === 'undone' ? '' : 'undone')
    setTimeout(() => deleteTask(task.id), 750)
    setDoneEffect(doneEffect - 1)
  }

  return (
    <div className={`task-button ${doneTask}`} onClick={handleClick}>
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
