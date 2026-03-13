import { entityTypes } from '../../types/servicesTypes'

export interface IDynamoRequestProps<T extends Record<string, any>> {
  tableName: string
  item: T
  updateKeys?: string[]
  entity: entityTypes
}
