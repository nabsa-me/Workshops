import { useTasksStore } from '../../app/store'
import { useShallow } from 'zustand/react/shallow'

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

  const completedTasks = tasks?.filter((task) => task.completed)

  return { tasks, createTask, updateTask, deleteTask, isLoading, completedTasks, loadTasks }
}
