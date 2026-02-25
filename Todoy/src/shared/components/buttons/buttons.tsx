import { IDeleteButtonProps, ITaskButtonProps } from './buttonsTypes'
import { FilledIconButton, Icon, IconButton } from '../icons/icons'
import { useTasks } from '../../hooks/useTasks'
import { useHooks } from '../../hooks/useHooks'

export const TaskButton = ({ setDoneTask, doneTask, status, task }: ITaskButtonProps) => {
  const { doneEffect, setDoneEffect } = useHooks()
  const { updateTask } = useTasks()

  const handleClick = () => {
    if (task.completed) {
      setDoneTask(doneTask === 'undone' ? '' : 'undone')
      setTimeout(() => updateTask(task.id, { completed: !task.completed }), 350)
      return
    }
    setDoneTask(doneTask === 'done' ? '' : 'done')
    setTimeout(() => updateTask(task.id, { completed: !task.completed }), 750)
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
