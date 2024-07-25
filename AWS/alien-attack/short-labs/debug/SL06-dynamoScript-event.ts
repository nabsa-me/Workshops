process.env.TABLENAME = 'WS-AlienAttack-Lab06-Table'

import { handler } from '../src/SL06-dynamoScript'

const event: Record<string, any> = {
  SessionId: 'TheTestSession',
  TopX: [
    {
      Level: 5,
      Lives: 3,
      Nickname: 'alanis',
      Score: 1500,
      Shots: 372,
      Timestamp: '2019-06-21T00:07:01.328Z'
    },
    {
      Level: 2,
      Lives: 0,
      Nickname: 'blanka',
      Score: 300,
      Shots: 89,
      Timestamp: '2019-06-26T08:28:52.264Z'
    },
    {
      Level: 1,
      Lives: 0,
      Nickname: 'bugsbunny',
      Score: 200,
      Shots: 88,
      Timestamp: '2019-06-26T08:49:19.049Z'
    },
    {
      Level: 1,
      Lives: 0,
      Nickname: 'billythekid',
      Score: 195,
      Shots: 46,
      Timestamp: '2019-06-25T22:43:32.050Z'
    },
    {
      Level: 1,
      Lives: 0,
      Nickname: 'nobodyknows',
      Score: 65,
      Shots: 17,
      Timestamp: '2019-06-26T08:33:47.951Z'
    },
    {
      Level: 1,
      Lives: 0,
      Nickname: 'mordorlord',
      Score: 5,
      Shots: 1,
      Timestamp: '2019-06-26T08:29:29.639Z'
    },
    {
      Level: 1,
      Lives: 3,
      Nickname: 'naruto',
      Score: 0,
      Shots: 0,
      Timestamp: '2019-06-26T14:24:17.748Z'
    },
    {
      Level: 1,
      Lives: 3,
      Nickname: 'ramon',
      Score: 0,
      Shots: 0,
      Timestamp: '2019-06-24T17:36:38.646Z'
    },
    {
      Level: 1,
      Lives: 3,
      Nickname: 'bruceb',
      Score: 0,
      Shots: 0,
      Timestamp: '2019-06-24T12:24:12.238Z'
    },
    {
      Level: 1,
      Lives: 3,
      Nickname: 'hackz',
      Score: 1,
      Shots: 0,
      Timestamp: '2019-06-24T17:36:38.646Z'
    }
  ]
}

handler(event)
