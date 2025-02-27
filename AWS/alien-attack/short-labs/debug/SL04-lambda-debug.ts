process.env.tableName = 'WS-AlienAttack-Lab04-Table'

import { KinesisStreamEvent } from 'aws-lambda'
import { handler } from '../src/SL04-lambda'

const event: KinesisStreamEvent = {
  Records: [
    {
      kinesis: {
        kinesisSchemaVersion: '1.0',
        partitionKey:
          'theuser@amazon.com#13522bac-89fb-4f14-ac37-92642eec2b06#USDJPY#200000#104.987#2021-02-01T18:42:35.903Z',
        sequenceNumber: '49653884219131507436893688315529844842680385183963676690',
        data: 'eyJVc2VyIjoidGhldXNlckBhbWF6b24uY29tIiwiQ2xpZW50IjoiMTM1MjJiYWMtODlmYi00ZjE0LWFjMzctOTI2NDJlZWMyYjA2IiwiVGltZXN0YW1wIjoiMjAyMS0wMi0wMVQxODo0MjozNS45MDNaIiwiT3JkZXIiOnsiU3ltYm9sIjoiVVNESlBZIiwiVm9sdW1lIjoyMDAwMDAsIlByaWNlIjoxMDQuOTg3fX0=',
        approximateArrivalTimestamp: 1720877154.701
      },
      eventSource: 'aws:kinesis',
      eventVersion: '1.0',
      eventID: 'shardId-000000000001:49653884219131507436893688315529844842680385183963676690',
      eventName: 'aws:kinesis:record',
      invokeIdentityArn: 'arn:aws:iam::476044956651:role/WS-AlienAttack-Lab04-LambdaRole',
      awsRegion: 'eu-west-3',
      eventSourceARN: 'arn:aws:kinesis:eu-west-3:476044956651:stream/WS-AlienAttack-Lab04-Stream'
    }
  ]
}

handler(event)
