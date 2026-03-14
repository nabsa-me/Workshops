import { ITask } from '../tasksTypes'
import { DynamoDBManager } from '../../../infrastructure/dynamoDB/dynamoDBManager'
import { entityTypes } from '../../../types/servicesTypes'

export class TasksManager {
  private dynamoDB = new DynamoDBManager()
  private tableName = `Todoy-Tasks-Table-${process.env.ENV}`
  private entity: entityTypes = 'task'

  async createTask(task: Partial<ITask>) {
    return await this.dynamoDB.createItem({ tableName: this.tableName, item: task, entity: this.entity })
  }

  async updateTask({ id, keysToUpdate }: { id: number; keysToUpdate: Partial<ITask> }) {
    return await this.dynamoDB.updateItem({ tableName: this.tableName, item: id, keysToUpdate, entity: this.entity })
  }
}
