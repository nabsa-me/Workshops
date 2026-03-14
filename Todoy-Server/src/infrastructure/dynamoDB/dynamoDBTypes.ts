import { ITask } from '../../services/tasks/tasksTypes'
import { entityTypes } from '../../types/servicesTypes'

export interface IDynamoRequestProps<T extends Record<string, any>> {
  tableName: string
  item: T
  keysToUpdate?: string[]
  entity: entityTypes
}

export interface IDynamoUpdateRequestProps {
  tableName: string
  item: number
  keysToUpdate?: Partial<ITask>
  entity: entityTypes
}
