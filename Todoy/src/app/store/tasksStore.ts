import { create } from 'zustand'
import { ITask } from '../../features/tasks/tasksTypes'
import { cleanTask, completeTask, createTask, deleteTask, getTasks, updateTask } from '../../features/tasks/taskApi'

function deepEqual(a: any, b: any): boolean {
  if (a === b) return true

  if (typeof a !== typeof b) return false
  if (typeof a !== 'object' || a === null || b === null) return false

  if (Array.isArray(a) !== Array.isArray(b)) return false
  if (Array.isArray(a)) {
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false
    }
    return true
  }

  const keysA = Object.keys(a)
  const keysB = Object.keys(b)
  if (keysA.length !== keysB.length) return false

  for (const key of keysA) {
    if (!keysB.includes(key)) return false
    if (!deepEqual(a[key], b[key])) return false
  }

  return true
}

export interface ITaskState {
  tasks: ITask[]
  storedTasks: ITask[]
  isLoading: boolean
  error: any
  filterText: string
  storeTaskSelector: (task: ITask) => void
  loadTasksSelector: () => Promise<void>
  createTaskSelector: ({ title, id, index }: { title: string; id: number; index?: number }) => void
  updateTaskSelector: (task: ITask, updates: Partial<ITask>) => void
  completeTaskSelector: (id: number) => void
  deleteTaskSelector: (id: number) => void
  cleanTaskSelector: (id: number) => void
  filterTaskSelector: (text: string) => void
}

export const useTasksStore = create<ITaskState>((set) => ({
  tasks: [],
  storedTasks: [],
  isLoading: true,
  error: null,
  filterText: '',

  loadTasksSelector: async () => {
    const { tasks } = useTasksStore.getState()

    if (tasks.length > 0) return

    try {
      const tasks = await getTasks()
      const storedTasks = tasks

      set({ tasks, isLoading: false })
      set({ storedTasks })
    } catch (err) {
      set({ error: err, isLoading: false })
    }
  },

  createTaskSelector: async ({ title, id, index }) => {
    try {
      const newTask = {
        id,
        title,
        completed: false,
        deleted: false
      }

      if (index !== undefined) {
        set((state) => {
          const safeIndex = Math.max(0, Math.min(index, state.tasks.length))
          return {
            tasks: [...state.tasks.slice(0, safeIndex), newTask, ...state.tasks.slice(safeIndex)]
          }
        })
      } else {
        set((state) => ({
          tasks: [newTask, ...state.tasks]
        }))
      }
    } catch (err) {
      set({ error: err })
    }
  },

  updateTaskSelector: async (taskToUpdate, updates) => {
    try {
      set((state) => ({
        tasks: state.tasks.map((task) => (task.id === taskToUpdate.id ? { ...task, ...updates } : task))
      }))
    } catch (err) {
      set({ error: err })
    }
  },

  storeTaskSelector: async (taskToStore) => {
    const { storedTasks } = useTasksStore.getState()
    const existing = storedTasks.find((task) => task.id === taskToStore.id)

    try {
      if (existing && deepEqual(existing, taskToStore)) {
        return
      }
      if (existing) {
        await updateTask(taskToStore)
        set((state) => ({
          storedTasks: state.storedTasks.map((task) => (task.id === taskToStore.id ? taskToStore : task))
        }))
      } else {
        await createTask(taskToStore)
        set((state) => ({
          storedTasks: [...state.storedTasks, taskToStore]
        }))
      }
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
  },

  cleanTaskSelector: async (id) => {
    try {
      await cleanTask(id)
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id)
      }))
    } catch (err) {
      set({ error: err })
    }
  },

  filterTaskSelector: async (text) => {
    set(() => ({ filterText: text }))
  }
}))
