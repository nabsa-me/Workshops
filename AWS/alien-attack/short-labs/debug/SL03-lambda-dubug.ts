import { handler } from '../src/SL03-lambda'

const event: Record<'Name', string> = { Name: 'string' }
handler(event)
