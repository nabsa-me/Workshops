import { useState, useRef, useEffect, useContext } from 'react'
import { DeleteButton, TaskButton } from '../../shared/components/buttons/buttons'
import { ITask } from './tasksTypes'
import { AppContext } from '../../shared/context/appContext'

const HomeTask = ({ task, autofocus, onBlur }: { task: ITask; autofocus?: boolean; onBlur?: () => void }) => {
  const [selectedTask, setSelectedTask] = useState<'selected' | ''>('')
  const [taskContent, setTaskContent] = useState<string>(task.title)
  const [doneTask, setDoneTask] = useState<'done' | ''>('')
  const taskRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { doneEffect } = useContext(AppContext)

  useEffect(() => {
    if (autofocus) {
      inputRef.current?.focus()
      setSelectedTask('selected')
    }
  }, [autofocus])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (taskRef.current && !taskRef.current.contains(event.target as Node)) setSelectedTask('')
    }

    document.addEventListener('mouseup', handleClickOutside)
    return () => document.removeEventListener('mouseup', handleClickOutside)
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskContent(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSelectedTask('')
    inputRef.current?.blur()
  }

  return (
    <div
      className={`homePage-taskItem-task ${selectedTask} ${doneTask} ${!doneEffect ? 'special' : ''} ${
        (task.completed || task.deleted) && 'inactive'
      }`}
      ref={taskRef}
      role={'listitem'}
    >
      <TaskButton setDoneTask={setDoneTask} doneTask={doneTask} status={task.completed ? 'completed' : ''} />
      <form className='task-form' onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className={`task-title ${selectedTask}`}
          value={taskContent}
          size={taskContent.length - 3}
          onClick={() => setSelectedTask('selected')}
          onChange={handleChange}
          tabIndex={-1}
          onBlur={() => onBlur?.()}
          autoFocus={autofocus}
        ></input>
      </form>
      <DeleteButton icon={task.deleted ? 'restore_from_trash' : 'delete'} doneTask={doneTask} />
    </div>
  )
}

export default HomeTask
