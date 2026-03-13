import { useTasksStore } from '../../app/store'
import { useShallow } from 'zustand/react/shallow'

export const useTasks = () => {
  const {
    tasks,
    storeTask,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
    isLoading,
    completeTask,
    cleanTask,
    filter,
    filterText
  } = useTasksStore(
    useShallow((state) => ({
      tasks: state.tasks,
      storeTask: state.storeTaskSelector,
      loadTasks: state.loadTasksSelector,
      createTask: state.createTaskSelector,
      updateTask: state.updateTaskSelector,
      completeTask: state.completeTaskSelector,
      deleteTask: state.deleteTaskSelector,
      cleanTask: state.cleanTaskSelector,
      isLoading: state.isLoading,
      filter: state.filterTaskSelector,
      filterText: state.filterText
    }))
  )

  const completedTasks = tasks?.filter((task) => task.completed)

  return {
    tasks,
    storeTask,
    createTask,
    updateTask,
    deleteTask,
    isLoading,
    completedTasks,
    loadTasks,
    completeTask,
    cleanTask,
    filter,
    filterText
  }
}
