import { useTasksStore } from '../../state/store'

export const useAddTask = () => useTasksStore((state) => state.addTask)
export const useGetTaskList = () => useTasksStore().tasks
export const useEditTask = () => useTasksStore((state) => state.editTask)
