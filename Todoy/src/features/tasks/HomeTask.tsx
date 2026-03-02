import { useState, useRef, useEffect } from 'react'
import { DeleteButton, TaskButton } from '../../shared/components/buttons/buttons'
import { doneTaskType, IHomeTaskProps } from './tasksTypes'
import { useTasks } from '../../shared/hooks/useTasks'
import { useHooks } from '../../shared/hooks/useHooks'

const HomeTask = ({ task, autofocus, onBlur, onFocus, handleTaskSubmit }: IHomeTaskProps) => {
  const [selectedTask, setSelectedTask] = useState<'selected' | ''>('')
  const [doneTask, setDoneTask] = useState<doneTaskType>('')
  const taskRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { doneEffect } = useHooks()
  const { updateTask } = useTasks()

  useEffect(() => {
    if (autofocus) {
      inputRef.current?.focus()
      setSelectedTask('selected')
    } else {
      setSelectedTask('')
    }
  }, [autofocus])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (taskRef.current && !taskRef.current.contains(event.target as Node)) {
        setSelectedTask('')
      }
    }
    document.addEventListener('mouseup', handleClickOutside)
    return () => document.removeEventListener('mouseup', handleClickOutside)
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    updateTask(task.id, { title: event.target.value })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSelectedTask('')
    inputRef.current?.blur()

    if (handleTaskSubmit) handleTaskSubmit(task)

    if (task?.title.trim() === '') {
      setSelectedTask(autofocus ? 'selected' : '')
      return
    }
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setSelectedTask('')
    if (event?.target.value.trim() !== '') updateTask(task.id, { title: task.title.trim() })
    onBlur?.()
  }

  return (
    <div
      className={`homePage-taskItem-task ${selectedTask} ${doneTask} ${!doneEffect ? 'special' : ''} ${
        (task.completed || task.deleted) && 'inactive'
      }`}
      ref={taskRef}
      role='listitem'
    >
      <TaskButton
        setDoneTask={setDoneTask}
        doneTask={doneTask}
        status={task.completed ? 'completed' : ''}
        task={task}
      />
      <form className='task-form' onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className={`task-title ${selectedTask}`}
          value={task.title}
          size={Math.max(task.title.length, 1)}
          onClick={() => {
            setSelectedTask('selected')
            onFocus?.()
          }}
          onFocus={() => {
            setSelectedTask('selected')
            onFocus?.()
          }}
          onChange={handleChange}
          tabIndex={-1}
          onBlur={(event) => handleBlur(event)}
          autoFocus={autofocus}
        />
      </form>
      <DeleteButton
        icon={task.deleted ? 'restore_from_trash' : 'delete'}
        doneTask={doneTask}
        task={task}
        setDoneTask={setDoneTask}
      />
    </div>
  )
}

export default HomeTask
