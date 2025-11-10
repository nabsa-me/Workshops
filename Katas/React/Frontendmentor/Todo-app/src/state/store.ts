import { create } from 'zustand'
import { TasksState } from '../types/tasks'

export const useTasksStore = create<TasksState>((set) => ({
  tasks: [],

  addTask: (text) =>
    set((state) => ({
      tasks: [{ id: crypto.randomUUID(), text, completed: false, status: 'pendant' }, ...state.tasks]
    })),

  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    })),

  editTask: (id, text) =>
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === id ? { ...task, text } : task))
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id)
    })),

  clearCompleted: () =>
    set((state) => ({
      tasks: state.tasks.filter((task) => !task.completed)
    }))
}))
