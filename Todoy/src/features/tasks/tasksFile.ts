import { ITask } from './tasksTypes'

export const tasks: ITask[] = [
  { id: 1, title: 'Buy milk', completed: false, deleted: false },
  { id: 2, title: 'Reply emails', completed: false, deleted: false },
  { id: 3, title: 'Workout', completed: false, deleted: false },
  { id: 4, title: 'Project meeting', completed: true, deleted: false },
  { id: 5, title: 'Doctor appointment', completed: true, deleted: false },
  { id: 6, title: 'Pay bills', completed: false, deleted: true },
  { id: 7, title: 'Clean room', completed: true, deleted: true }
]
