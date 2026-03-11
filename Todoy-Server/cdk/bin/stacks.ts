import { App } from 'aws-cdk-lib'
import { TodoyApiStack } from '../lib/todoyApi'
import { TodoyTasksStack } from '../lib/todoyTasksService'
import { TodoyDBStack } from '../lib/todoyDB'

const app = new App()

const TodoyTasks = new TodoyTasksStack(app, `Todoy-Tasks-Stack-${process.env.ENV}`, {
  description:
    'Stack for the creation of Todoy Tasks Services Resources as Lambdas, IAM Roles, Policies, EventBridge rules.',
  stackName: `Todoy-Tasks-Stack-${process.env.ENV}`,
  baseId: 'Todoy-Tasks'
})

new TodoyApiStack(app, `Todoy-Api-Stack-${process.env.ENV}`, {
  description: 'Stack for the creation of Todoy Api, Domain, Authorizers and Base Routes',
  stackName: `Todoy-Api-Stack-${process.env.ENV}`,
  baseId: 'Todoy-API',
  tasksLambdaArn: TodoyTasks.apiLambdaArn
})

new TodoyDBStack(app, `Todoy-DB-Stack-${process.env.ENV}`, {
  description: 'Stack for the creation Aurora Cluster and PostgreSQL tables',
  stackName: `Todoy-DB-Stack-${process.env.ENV}`,
  baseId: 'Todoy-DB'
})
