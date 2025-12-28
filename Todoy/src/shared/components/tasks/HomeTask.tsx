import { useState, useRef, useEffect } from 'react'
import { DeleteButton, TaskButton } from '../buttons/taskButtons'
import { ITask } from './tasksTypes'

const HomeTask = ({ task }: { task: ITask }) => {
  const [selectedTask, setSelectedTask] = useState<'selected' | ''>('')
  const [taskContent, setTaskContent] = useState<string>(task.title)

  const taskRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (taskRef.current && !taskRef.current.contains(event.target as Node)) setSelectedTask('')
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
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
    <div className={`homePage-taskItem ${selectedTask}`} ref={taskRef}>
      <div className={`homePage-taskItem-task ${selectedTask}`}>
        <TaskButton />
        <form className='task-form' onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            className={`task-title ${selectedTask}`}
            value={taskContent}
            size={taskContent.length - 3}
            onClick={() => setSelectedTask('selected')}
            onChange={handleChange}
            tabIndex={-1}
          ></input>
        </form>
        <DeleteButton />
      </div>
      <div className={`homePage-taskItem-background ${selectedTask}`}></div>
    </div>
  )
}

export default HomeTask
