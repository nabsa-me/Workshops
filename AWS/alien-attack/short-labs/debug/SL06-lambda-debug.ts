process.env.TABLENAME = 'WS-AlienAttack-Lab06-Table'

import { handler } from '../src/SL06-lambda'

const event: Record<string, any> = {
  params: {
    path: {},
    querystring: {
      sessionId: 'TheTestSession'
    }
  }
}

// const event2: Record<string, any> = { params: { path: {}, querystring: {} } }

// const event3: Record<string, any> = { params: { path: {}, querystring: { sessionId: 'WRONG' } } }

// const event4: Record<string, any> = { queryStringParameters: { sessionId: 'TheTestSession' } }

// const event5: Record<string, any> = { queryStringParameters: { sessionId: 'WRONG' } }

// const event6: Record<string, any> = { queryStringParameters: {} }

handler(event)
