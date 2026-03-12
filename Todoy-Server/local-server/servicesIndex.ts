import { handler as tasks } from '../src/services/tasks/handler'

export const lambdas = { tasks, projects: tasks, stripe: tasks }
