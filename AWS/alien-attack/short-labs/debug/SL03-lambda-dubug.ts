import { handler } from '../src/SL03-lambda'

const event: Record<'Name', string> = { Name: 'Short-Lab-03' }
handler(event)
