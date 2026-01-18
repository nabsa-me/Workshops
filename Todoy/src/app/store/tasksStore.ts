import { create } from 'zustand'
import { ITask } from '../../features/tasks/tasksTypes'
import { getTasks } from '../../features/tasks/taskApi'

export interface ITaskState {
  tasks: ITask[]
  isLoading: boolean
  error: any
  loadTasksSelector: () => Promise<void>
  createTaskSelector: ({ title, id }: { title: string; id: number }) => void
  updateTaskSelector: (id: number, updates: Partial<Pick<ITask, 'title' | 'completed' | 'deleted'>>) => void
  deleteTaskSelector: (id: number) => void
}

export const useTasksStore = create<ITaskState>((set) => ({
  tasks: [],
  isLoading: true,
  error: null,

  loadTasksSelector: async () => {
    try {
      const tasks = await getTasks()
      set({ tasks, isLoading: false })
    } catch (err) {
      set({ error: err, isLoading: false })
    }
  },

  createTaskSelector: ({ title, id }) =>
    set((state) => ({
      tasks: [
        {
          id,
          title,
          completed: false,
          deleted: false
        },
        ...state.tasks
      ]
    })),

  updateTaskSelector: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === id ? { ...task, ...updates } : task))
    })),

  deleteTaskSelector: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id)
    }))
}))
