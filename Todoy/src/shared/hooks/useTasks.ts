import { useEffect, useState, useCallback } from 'react'
import { useTasksStore } from '../../app/store'
import { useShallow } from 'zustand/react/shallow'
import { ITask } from '../../features/tasks/tasksTypes'

export const useTasks = () => {
  const { tasks, loadTasks, createTask, updateTask, deleteTask, isLoading } = useTasksStore(
    useShallow((state) => ({
      tasks: state.tasks,
      loadTasks: state.loadTasksSelector,
      createTask: state.createTaskSelector,
      updateTask: state.updateTaskSelector,
      deleteTask: state.deleteTaskSelector,
      isLoading: state.isLoading
    }))
  )

  const [completedTasks, setCompletedTasks] = useState<ITask[]>([])

  const loadTasksMemo = useCallback(loadTasks, [loadTasks])

  useEffect(() => {
    loadTasksMemo()
  }, [loadTasksMemo])

  useEffect(() => {
    setCompletedTasks(tasks.filter((task) => task.completed))
  }, [tasks])

  return { tasks, createTask, updateTask, deleteTask, isLoading, completedTasks }
}
