import React from 'react'
import { useEditTask, useGetTaskList } from '../hooks/useTasks'
import { DeleteButton, TaskButton } from './buttons'

const TaskComponent = ({ id, value, last }: { id: string; value: string; last: boolean }) => {
  const editTask = useEditTask()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => editTask(id, event.target.value)

  return (
    <li className={`single-box task ${last ? 'last-task' : ''}`}>
      <TaskButton />
      <input value={value} onChange={handleChange}></input>
      <DeleteButton />
    </li>
  )
}

const Task = React.memo(TaskComponent)

export const TaskList = () => {
  const tasks = useGetTaskList()

  return (
    <div className='task-list-wrapper'>
      <ul className='rounded'>
        {tasks?.map((task, index) => (
          <Task value={String(task.text)} key={task.id} id={task.id} last={tasks.length === index + 1} />
        ))}
        <div className='single-box'>
          <div className='manage-box'>
            <p>Items left</p>
            <p>Clear completed</p>
          </div>
        </div>
      </ul>
    </div>
  )
}
