import { ITask } from '../../services/tasks/tasksTypes'
import { DynamoDBManager } from './dynamoDBManager'

export class TasksTable {
  private dynamoDB = new DynamoDBManager()
  private tableName = `Todoy-Tasks-Table-${process.env.ENV}`

  async createTask(task: ITask) {
    return await this.dynamoDB.createItem(this.tableName, task, 'task')
  }
}
