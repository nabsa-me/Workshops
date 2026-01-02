import { useState, useRef, useEffect } from 'react'
import { DeleteButton, TaskButton } from '../../../shared/components/buttons/taskButtons'
import { ITask } from '../tasksTypes'

const HomeTask = ({ task, autofocus, onBlur }: { task: ITask; autofocus?: boolean; onBlur?: () => void }) => {
  const [selectedTask, setSelectedTask] = useState<'selected' | ''>('')
  const [taskContent, setTaskContent] = useState<string>(task.title)
  const [doneTask, setDoneTask] = useState<'done' | ''>('')

  const taskRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

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
    <div className={`homePage-taskItem ${selectedTask} ${doneTask}`} ref={taskRef}>
      <div className={`homePage-taskItem-task ${selectedTask}`}>
        <TaskButton setDoneTask={setDoneTask} doneTask={doneTask} />
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
        <DeleteButton />
      </div>
      <div className={`homePage-taskItem-background ${selectedTask} ${doneTask}`}></div>
    </div>
  )
}

export default HomeTask
