import React from 'react'
import { useEditTask, useGetTaskList } from '../hooks/useTasks'
import { DeleteButton, TaskButton } from './buttons'

const TaskComponent = ({ id, value }: { id: string; value: string }) => {
  const editTask = useEditTask()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => editTask(id, event.target.value)

  return (
    <div className='single-box task'>
      <TaskButton />
      <input value={value} onChange={handleChange}></input>
      <DeleteButton />
    </div>
  )
}

const Task = React.memo(TaskComponent)

export const TaskList = () => {
  const tasks = useGetTaskList()

  return (
    <ul className='rounded'>
      {tasks.map((task) => (
        <Task value={String(task.text)} key={task.id} id={task.id} />
      ))}
      <div className='single-box'>
        <div className='manage-box'>
          <p>Items left</p>
          <p>Clear completed</p>
        </div>
      </div>
    </ul>
  )
}
