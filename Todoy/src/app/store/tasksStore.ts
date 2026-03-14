import { create } from 'zustand'
import { ITask } from '../../features/tasks/tasksTypes'
import { cleanTask, createTask, deleteTask, getTasks, updateTask } from '../../features/tasks/taskApi'
import { NEW_TASK_TEMPLATE } from '../../shared/constants'

function deepEqual(oldObj: any, newObj: any): Record<string, any> | false {
  if (oldObj === newObj) return false
  if (typeof oldObj !== typeof newObj) return { changedTo: newObj }
  if (typeof oldObj !== 'object' || oldObj === null || newObj === null) return { changedTo: newObj }

  if (Array.isArray(oldObj) !== Array.isArray(newObj)) return { changedTo: newObj }
  if (Array.isArray(oldObj)) {
    if (oldObj.length !== newObj.length) return { changedTo: newObj }
    for (let i = 0; i < oldObj.length; i++) {
      const elementDiff = deepEqual(oldObj[i], newObj[i])
      if (elementDiff) return { changedTo: newObj }
    }
    return false
  }

  const allKeys = Array.from(new Set([...Object.keys(oldObj), ...Object.keys(newObj)]))
  const changes: Record<string, any> = {}

  for (const key of allKeys) {
    if (!(key in oldObj)) {
      changes[key] = newObj[key]
      continue
    }
    if (!(key in newObj)) {
      changes[key] = undefined
    }

    const valueDiff = deepEqual(oldObj[key], newObj[key])
    if (valueDiff) {
      changes[key] =
        typeof valueDiff === 'object' && !Array.isArray(valueDiff) && 'changedTo' in valueDiff
          ? valueDiff.changedTo
          : valueDiff
    }
  }

  return Object.keys(changes).length > 0 ? changes : false
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
  completeTaskSelector: ({ id, isCompleted }: { id: number; isCompleted: boolean }) => void
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

  createTaskSelector: ({ title, id, index }) => {
    const newTask = { ...NEW_TASK_TEMPLATE, id, title }

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
  },

  updateTaskSelector: (taskToUpdate, updates) => {
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === taskToUpdate.id ? { ...task, ...updates } : task))
    }))
  },

  storeTaskSelector: async (taskToStore) => {
    const { storedTasks } = useTasksStore.getState()
    const existing = storedTasks.find((task) => task.id === taskToStore.id)
    const keysToUpdate = deepEqual(existing, taskToStore)

    try {
      if (existing && !keysToUpdate) return

      if (existing && keysToUpdate) {
        await updateTask({ keysToUpdate, id: taskToStore.id })
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

  completeTaskSelector: async ({ id, isCompleted }) => {
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    }))

    try {
      await updateTask({ id, keysToUpdate: { completed: !isCompleted } })
    } catch (err) {
      set({ error: err })
    }

    set((state) => ({
      storedTasks: state.storedTasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    }))
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
