process.env.tableName = 'WS-AlienAttack-Lab05-Table'

import { handler } from '../src/SL05-lambda'

const event: Record<string, any> = {
  Id: 'PRD01',
  Description: 'UNICORN GENERATOR',
  LatestStockUpdate: '2019-10-22T22:15:34Z',
  Suppliers: ['S045', 'S4456', 'ACME126']
}

handler(event)
