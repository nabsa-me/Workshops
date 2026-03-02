import { create } from 'zustand'
import { ITask } from '../../features/tasks/tasksTypes'
import { completeTask, createTask, deleteTask, getTasks, updateTask } from '../../features/tasks/taskApi'

export type updateTaskSelectorUpdateType = Partial<Pick<ITask, 'title' | 'completed' | 'deleted'>>
export interface ITaskState {
  tasks: ITask[]
  isLoading: boolean
  error: any
  loadTasksSelector: () => Promise<void>
  createTaskSelector: ({ title, id }: { title: string; id: number }) => void
  updateTaskSelector: (id: number, updates: updateTaskSelectorUpdateType) => void
  completeTaskSelector: (id: number) => void
  deleteTaskSelector: (id: number) => void
}

export const useTasksStore = create<ITaskState>((set) => ({
  tasks: [],
  isLoading: true,
  error: null,

  loadTasksSelector: async () => {
    const { tasks } = useTasksStore.getState()
    if (tasks.length > 0) return

    try {
      const tasks = await getTasks()
      set({ tasks, isLoading: false })
    } catch (err) {
      set({ error: err, isLoading: false })
    }
  },

  createTaskSelector: async ({ title, id }) => {
    try {
      const newTask = {
        id,
        title,
        completed: false,
        deleted: false
      }

      await createTask(newTask)
      set((state) => ({
        tasks: [newTask, ...state.tasks]
      }))
    } catch (err) {
      set({ error: err })
    }
  },

  updateTaskSelector: async (id, updates) => {
    try {
      await updateTask(id, updates)
      set((state) => ({
        tasks: state.tasks.map((task) => (task.id === id ? { ...task, ...updates } : task))
      }))
    } catch (err) {
      set({ error: err })
    }
  },

  completeTaskSelector: async (id) => {
    try {
      await completeTask(id)
      set((state) => ({
        tasks: state.tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
      }))
    } catch (err) {
      set({ error: err })
    }
  },

  deleteTaskSelector: async (id) => {
    try {
      await deleteTask(id)
      set((state) => ({
        tasks: state.tasks.map((task) => (task.id === id ? { ...task, deleted: !task.deleted } : task))
      }))
    } catch (err) {
      set({ error: err })
    }
  }
}))
