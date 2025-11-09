type Task = {
  id: string
  text: string
  completed: boolean
}

export type TasksState = {
  tasks: Task[]
  addTask: (text: string) => void
  toggleTask: (id: string) => void
  editTask: (id: string, text: string) => void
  deleteTask: (id: string) => void
  clearCompleted: () => void
}
